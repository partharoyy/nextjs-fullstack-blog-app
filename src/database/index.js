import mongoose from 'mongoose';
import 'dotenv/config';

async function connectDB() {
  mongoose
    .connect(process.env.NEXT_PUBLIC_DATABASE_URI.toString())
    .then(() => console.log('DB connected'))
    .catch((e) => console.log(e));
}

export default connectDB;
