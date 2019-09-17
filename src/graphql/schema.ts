import { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID } from 'graphql';
import { NsfwModel, UnixPornModel, MemeModel, HentaiModel } from '../models/CacheModels';

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
    hentai: {
      type: CacheType,
      async resolve(parents, args) {
        const data = await HentaiModel.find({});
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
