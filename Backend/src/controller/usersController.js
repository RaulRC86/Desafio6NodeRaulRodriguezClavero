import { db } from "../db/database.js";
import jwt from 'jsonwebtoken'; 
import dotenv from 'dotenv';
dotenv.config();

export const agregarUsuariosController = async (req, res) => {
  try {
    const { nombre, email, password } = req.body;
    const query = "INSERT INTO usuarios VALUES (DEFAULT, $1, $2, $3) RETURNING *";
    const values = [nombre, email, password];
    const result = await db.query(query, values);

    res.status(201).json({ message: "Usuario creado", usuario: result.rows });
  } catch (error) {
    console.log(error.message);
  }
};






export const loginController = async (req, res) => {
  const { email, password } = req.body;
  try {

    if(!email || !password) {
      return res.status(400).json({ message: "Se requiere email y contraseña" });
    }

    const consulta = "SELECT * FROM clientes WHERE email=$1 AND password=$2";
    const values = [email, password];

    const {rows, rowCount} = await db.query(consulta, values);
    if(!rowCount) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }
    const user = rows[0];
    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ message: "Login exitoso", token, user });
    
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Error en el servidor" });
  }
}


export const obtenerUsuarioController = async (req, res) => {
  try {
    const { email } = req.user; 
    const query = "SELECT * FROM usuarios WHERE email=$1";
    const values = [email];

    const { rows, rowCount } = await db.query(query, values);

    if (!rowCount) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Error en el servidor" });
  }
};
