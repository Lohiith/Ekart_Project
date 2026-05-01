import mongoose from 'mongoose';

export const connectDatabase = () => {
  mongoose.connect(process.env.DB_URL).then((con) => {
    console.log('✅ Database connected successfully '+ con.connection.host);
  }).catch((err) => {
    console.error('❌ Database connection failed:', err);
  });
}
