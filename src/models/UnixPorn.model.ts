import { Schema, model } from 'mongoose';
import timestamp = require('mongoose-timestamp');

const UnixPornSchema: Schema = new Schema({
  data: {
    title: { type: String, required: true },
    body: String,
    url: { type: String, required: true },
    image: { type: String, required: true },
    subreddit: String,
  },
  timestamp: { type: Date, default: Date.now() },
});

UnixPornSchema.plugin(timestamp);

export default model('UnixPorn', UnixPornSchema);
