import express from 'express';
import graphqlHTTP from 'express-graphql';
import schema from './graphql/schema';
import helmet from 'helmet';
import cors from 'cors';
import { init } from './util/init';
import fetch from 'node-fetch';
import ms = require('ms');

import UnixModel from './models/UnixPorn.model';
import MemeModel from './models/Meme.model';
import NsfwModel from './models/Nsfw.model';
import mongoose from 'mongoose';

const PORT = 3200 || process.env.PORT;

// Dotenv config
require('dotenv').config();

// Db and App init
const app = express();

const db = async () => {
  await init();
};
db();

// Security and Cors
app.use(helmet());
app.use(cors());

// Routes

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

// Fetching

const UNIXPORNURL = 'https://www.reddit.com/r/unixporn.json?limit=50&sort=hot&raw_json=1';
const DANKMEMESURL = 'https://www.reddit.com/r/dankmemes.json?limit=50&sort=hot&raw_json=1';
const GETNSFWURL = async () => {
  const nsfwArray = [
    'https://www.reddit.com/r/Hentai.json?limit=50&sort=hot&raw_json=1',
    'https://www.reddit.com/r/nsfw.json?limit=50&sort=hot&raw_json=1',
    'https://www.reddit.com/r/thic_hentai.json?limit=50&sort=hot&raw_json=1',
  ];
  const randomUrl = nsfwArray[Math.floor(Math.random() * nsfwArray.length)];
  return await nsfwArray[randomUrl];
};

const getPosts = async () => {
  console.log('Fetching a new set of posts');
  await fetch(DANKMEMESURL)
    .then(res => res.json())
    .then(async json => {
      const posts = json.data.children.map(post => post.data);
      posts.forEach(async doc => {
        const reg = new RegExp('^(?=.*\\.(png|jpg|gif)($|\\?)).*');
        if (!reg.test(doc.url)) return;
        const newModel = await new MemeModel({
          data: {
            title: doc.title,
            body: doc.selftext,
            url: doc.permalink,
            thumbnail: doc.thumbnail,
            image: doc.url,
          },
        });
        newModel
          .save()
          .catch(e => console.error(e))
          .then(() => console.log('Done'));
      });
    });
};

async function allPosts() {
  await UnixModel.deleteMany({});
  await MemeModel.deleteMany({});
  await NsfwModel.deleteMany({});
  getPosts();
}

allPosts();
setInterval(allPosts, ms('12 h'));

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
