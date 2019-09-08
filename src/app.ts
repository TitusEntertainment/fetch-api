import express from 'express';
import graphqlHTTP from 'express-graphql';
import schema from './graphql/schema';
import helmet from 'helmet';
import cors from 'cors';
import { init } from './util/init';
import fetch from 'node-fetch';
import ms = require('ms');
import rateLimit from 'express-rate-limit';
import session from 'express-session';

// Models
import UnixModel from './models/UnixPorn.model';
import MemeModel from './models/Meme.model';
import NsfwModel from './models/Nsfw.model';
import { cacheInterface } from './models/interface';

// Dotenv config
require('dotenv').config();

// Db and App init
const app = express();

const db = async () => {
  await init();
};
db();

// Security (helmet), cors and rate limiting
const secret = '12312asdwedqeWEQEQWE1' || process.env.SESSION_SECRET;
app.use(helmet());
app.use(cors());
app.use(
  session({
    name: 'sessionId',
    secret,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);
const limiter: rateLimit = rateLimit({
  windowMs: ms('5m'),
  max: 150,
});
app.use('/api', limiter);

// Routes

app.use(
  '/api',
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

// Fetching

const UNIXPORNURL: String = 'https://www.reddit.com/r/unixporn.json?limit=50&sort=hot&raw_json=1';
const DANKMEMESURL: String = 'https://www.reddit.com/r/dankmemes.json?limit=50&sort=hot&raw_json=1';
const nsfwArray: String[] = [
  'https://www.reddit.com/r/Hentai.json?limit=50&sort=hot&raw_json=1',
  'https://www.reddit.com/r/nsfw.json?limit=50&sort=hot&raw_json=1',
  'https://www.reddit.com/r/thic_hentai.json?limit=50&sort=hot&raw_json=1',
];

const getPosts: Function = async (url: string, model: any) => {
  console.log('Fetching a new set of posts');
  await fetch(url)
    .then(res => res.json())
    .then(async json => {
      const posts = json.data.children.map(post => post.data);
      posts.forEach(async doc => {
        const reg = new RegExp('^(?=.*\\.(png|jpg|gif)($|\\?)).*');
        if (!reg.test(doc.url)) return;
        const newModel: cacheInterface = await new model({
          title: doc.title,
          body: doc.selftext,
          url: doc.permalink,
          thumbnail: doc.thumbnail,
          image: doc.url,
        });
        newModel.save().catch(e => console.error(e));
      });
      console.log(`Cached posts from: ${url}`);
    });
};

async function allPosts() {
  try {
    await UnixModel.deleteMany({});
    await MemeModel.deleteMany({});
    await NsfwModel.deleteMany({});
  } catch (error) {
    console.log('Something went wrong deleting the previous collections');
    console.error(error);
  }
  getPosts(DANKMEMESURL, MemeModel);
  getPosts(nsfwArray[0], NsfwModel);
  getPosts(nsfwArray[1], NsfwModel);
  getPosts(nsfwArray[2], NsfwModel);
  getPosts(UNIXPORNURL, UnixModel);
}

allPosts();
setInterval(allPosts, ms('6 hrs'));

const PORT = 3200 || process.env.PORT;

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
