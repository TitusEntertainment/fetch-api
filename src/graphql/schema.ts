import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
} from 'graphql';

import MemeSchema from '../models/Meme.model';
import NsfwSchema from '../models/Nsfw.model';
import UnixPornSchema from '../models/UnixPorn.model';
import MemeModel from '../models/Meme.model';

const DataType = new GraphQLObjectType({
  name: 'Data',
  fields: () => ({
    title: { type: GraphQLString },
    body: { type: GraphQLString },
    image: { type: GraphQLString },
    url: { type: GraphQLString },
  }),
});

const CacheType = new GraphQLObjectType({
  name: 'Meme',
  fields: () => ({
    id: { type: GraphQLID },
    data: { type: DataType },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    meme: {
      type: CacheType,
      resolve() {
        MemeModel.aggregate().sample(1);
      },
    },
  },
});

export default new GraphQLSchema({
  query: RootQuery,
});
