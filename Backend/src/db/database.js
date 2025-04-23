import pkg from "pg";
const { Pool } = pkg;
import "dotenv/config";


console.log("Variables de entorno cargadas:");
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_DATABASE:", process.env.DB_DATABASE);
console.log("DB_PASSWORD:", process.env.DB_PASSWORD);

export const db = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  allowExitOnIdle: true,
});

export const obtenerDB = async () => {
  try {
    const result = await db.query("SELECT current_database()");
    console.log(
      `Conectado a la base de datos ${result.rows[0].current_database}`
    );
  } catch (error) {
    console.log("Error al conectar a la base de datos", error.message);
  }
};


