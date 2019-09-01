"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_graphql_1 = __importDefault(require("express-graphql"));
const schema_1 = __importDefault(require("./graphql/schema"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const init_1 = require("./util/init");
const node_fetch_1 = __importDefault(require("node-fetch"));
const ms = require("ms");
const UnixPorn_model_1 = __importDefault(require("./models/UnixPorn.model"));
const Meme_model_1 = __importDefault(require("./models/Meme.model"));
const Nsfw_model_1 = __importDefault(require("./models/Nsfw.model"));
const PORT = 3200 || process.env.PORT;
// Dotenv config
require('dotenv').config();
// Db and App init
const app = express_1.default();
const db = async () => {
    await init_1.init();
};
db();
// Security and Cors
app.use(helmet_1.default());
app.use(cors_1.default());
// Routes
app.use('/graphql', express_graphql_1.default({
    schema: schema_1.default,
    graphiql: true,
}));
// Fetching
const UNIXPORNURL = 'https://www.reddit.com/r/unixporn.json?limit=50&sort=hot&raw_json=1';
const DANKMEMESURL = 'https://www.reddit.com/r/dankmemes.json?limit=50&sort=hot&raw_json=1';
const GETNSFWURL = async () => {
    const nsfwArray = [
        'https://www.reddit.com/r/Hentai.json?limit=50&sort=hot&raw_json=1',
        'https://www.reddit.com/r/nsfw.json?limit=50&sort=hot&raw_json=1',
        'https://www.reddit.com/r/thic_hentai.json?limit=50&sort=hot&raw_json=1',
    ];
    return await nsfwArray[Math.floor(Math.random() * nsfwArray.length)];
};
const getPosts = async (model1, model2, model3) => {
    console.log('Fetching a new set of posts');
    await node_fetch_1.default(DANKMEMESURL)
        .then(res => res.json())
        .then(async (json) => {
        json.data.children.forEach(async (doc) => {
            if (!doc.url.endsWith('.jpg' || '.png'))
                return;
            const data = {
                title: doc.title,
                body: doc.selftext,
                url: doc.permalink,
                thumbnail: doc.thumbnail,
                image: doc.url,
            };
            const newModel = await new model1(data);
            newModel.save().catch(e => console.error(e));
        });
    });
    await node_fetch_1.default(GETNSFWURL())
        .then(res => res.json())
        .then(async (json) => {
        json.data.children.forEach(async (doc) => {
            if (!doc.url.endsWith('.jpg' || '.png'))
                return;
            const data = {
                title: doc.title,
                body: doc.selftext,
                url: doc.permalink,
                thumbnail: doc.thumbnail,
                image: doc.url,
            };
            const newModel = await new model2(data);
            newModel.save().catch(e => console.error(e));
        });
    });
    await node_fetch_1.default(GETNSFWURL())
        .then(res => res.json())
        .then(async (json) => {
        json.data.children.forEach(async (doc) => {
            if (!doc.url.endsWith('.jpg' || '.png'))
                return;
            const data = {
                title: doc.title,
                body: doc.selftext,
                url: doc.permalink,
                thumbnail: doc.thumbnail,
                image: doc.url,
            };
            const newModel = await new model3(data);
            newModel.save().catch(e => console.error(e));
        });
    });
};
async function allPosts() {
    await UnixPorn_model_1.default.deleteMany({});
    await Meme_model_1.default.deleteMany({});
    await Nsfw_model_1.default.deleteMany({});
    getPosts(Meme_model_1.default, UnixPorn_model_1.default, Nsfw_model_1.default);
}
allPosts();
setInterval(allPosts, ms('12 h'));
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
