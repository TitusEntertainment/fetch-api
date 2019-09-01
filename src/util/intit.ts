import mongoose from 'mongoose';

export const init = () => {
  mongoose.connect(process.env.CREDENTIALS || 'mongodb://localhost:27017/Rest-Api', {
    useNewUrlParser: true,
    autoIndex: true,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 500,
    poolSize: 5,
    connectTimeoutMS: 10000,
    family: 4,
  });
  mongoose.Promise = global.Promise;

  mongoose.connection.on('connected', () => {
    console.info('Client has connected to database');
  });

  mongoose.connection.on('err', err => {
    console.error(err);
  });

  mongoose.connection.on('disconnected', () => {
    console.warn('Disconnected from database');
  });
};
