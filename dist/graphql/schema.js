"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const Meme_model_1 = __importDefault(require("../models/Meme.model"));
const DataType = new graphql_1.GraphQLObjectType({
    name: 'Data',
    fields: () => ({
        title: { type: graphql_1.GraphQLString },
        body: { type: graphql_1.GraphQLString },
        image: { type: graphql_1.GraphQLString },
        url: { type: graphql_1.GraphQLString },
    }),
});
const CacheType = new graphql_1.GraphQLObjectType({
    name: 'Meme',
    fields: () => ({
        id: { type: graphql_1.GraphQLID },
        data: { type: DataType },
    }),
});
const RootQuery = new graphql_1.GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        meme: {
            type: CacheType,
            resolve() {
                Meme_model_1.default.aggregate().sample(1);
            },
        },
    },
});
exports.default = new graphql_1.GraphQLSchema({
    query: RootQuery,
});
