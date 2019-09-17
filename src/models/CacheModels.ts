import { Schema, model, Document } from 'mongoose';
import timestamp = require('mongoose-timestamp');

const CacheSchema: Schema = new Schema({
  title: { type: String, required: true },
  body: String,
  url: { type: String, required: true },
  image: { type: String, required: true },
  timestamp: { type: Date, default: Date.now() },
});

CacheSchema.plugin(timestamp);

export default model('Hentai', CacheSchema);

const HentaiModel = model('Hentai', CacheSchema);
const MemeModel = model('Meme', CacheSchema);
const NsfwModel = model('Nsfw', CacheSchema);
const UnixPornModel = model('Unixporn', CacheSchema);

export { HentaiModel, MemeModel, NsfwModel, UnixPornModel };
