import env from "dotenv";
env.config();

const GLOBALS = {
  PORT: process.env.PORT,
  MONGODB_URI: process.env.MONGODB_URI,
  KEY: process.env.KEY,
  IV: process.env.IV,
  SECRET_KEY: process.env.SECRET_KEY,
};

export default GLOBALS;
