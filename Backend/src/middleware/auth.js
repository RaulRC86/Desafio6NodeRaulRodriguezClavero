import jwt from 'jsonwebtoken'; 
import dotenv from 'dotenv';
dotenv.config();

export const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Bearer token
        if (!token) {
            return res.status(401).json({ message: 'No tiene token' });
        }        
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = payload; // Guardar el payload en la request
        next(); // Continuar con la siguiente función middleware o ruta
    } catch (error) {
        return res.status(401).json({ message: 'Token inválido' });
    }
}