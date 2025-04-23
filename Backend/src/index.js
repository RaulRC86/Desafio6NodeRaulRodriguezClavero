import express from 'express';
import 'dotenv/config'
import cors from "cors";
import { allRoutes } from './router.js'; 
import { obtenerDB } from './db/database.js';


const app = express();

app.use(cors());
app.use(express.json());


app.use(allRoutes); 


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

obtenerDB(); 