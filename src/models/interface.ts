import { Document } from 'mongoose';

export interface cacheInterface extends Document {
  data: {
    body: String;
    title: String;
    image: String;
    url: String;
  };
}
