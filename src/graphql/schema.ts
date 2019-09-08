import { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID } from 'graphql';

import NsfwModel from '../models/Nsfw.model';
import UnixPornModel from '../models/UnixPorn.model';
import MemeModel from '../models/Meme.model';
import { cacheInterface } from '../models/interface';

const CacheType = new GraphQLObjectType({
  name: 'Cache',
  fields: () => ({
    title: { type: GraphQLString },
    body: { type: GraphQLString },
    image: { type: GraphQLString },
    url: { type: GraphQLString },
  }),
});

const RootQuery: GraphQLObjectType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    meme: {
      type: CacheType,
      async resolve(parent, args) {
        const data = await MemeModel.find({});
        return data[Math.floor(Math.random() * data.length)];
      },
    },
    nsfw: {
      type: CacheType,
      async resolve(parent, args) {
        const data = await NsfwModel.find({});
        return data[Math.floor(Math.random() * data.length)];
      },
    },
    unixporn: {
      type: CacheType,
      async resolve() {
        const data = await UnixPornModel.find({});
        return data[Math.floor(Math.random() * data.length)];
      },
    },
  },
});

export default new GraphQLSchema({
  query: RootQuery,
});
