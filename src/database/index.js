import mongoose from 'mongoose';

async function connectDB() {
  mongoose
    .connect(env.process.DATABASE_URI)
    .then(() => console.log('DB connected'))
    .catch((e) => console.log(e));
}

export default connectDB;
