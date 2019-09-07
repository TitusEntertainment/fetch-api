import { Schema, model, Document } from 'mongoose';
import timestamp = require('mongoose-timestamp');

const MemeSchema: Schema = new Schema({
  title: { type: String, required: true },
  body: String,
  url: { type: String, required: true },
  image: { type: String, required: true },
  timestamp: { type: Date, default: Date.now() },
});

MemeSchema.plugin(timestamp);

export default model('Meme', MemeSchema);
