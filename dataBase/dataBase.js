import pg from "pg";
import dontev from "dotenv";

dontev.config();

const {Pool} = pg;

const databaseConfig = {
  connectionString: process.env.DATABASE_URL,
  ssl: {
      rejectUnauthorized: false
  }
}

const connection = new Pool(databaseConfig);


  export default connection;