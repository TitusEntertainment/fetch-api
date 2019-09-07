import { Document } from 'mongoose';

export interface cacheInterface extends Document {
  body: String;
  title: String;
  image: String;
  url: String;
}
