import { Schema, model } from 'mongoose';
import timestamp = require('mongoose-timestamp');

const MemeSchema: Schema = new Schema({
  data: {
    title: { type: String, required: true },
    body: String,
    url: { type: String, required: true },
    image: { type: String, required: true },
  },
});

MemeSchema.plugin(timestamp);

export default model('Meme', MemeSchema);
