"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.autenticarToken = autenticarToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwtSecretKey = "Chave secreta";
function autenticarToken() {
    return (req, res, next) => {
        var _a;
        const token = (_a = req.headers['authorization']) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        if (!token) {
            return res.status(401).json({ error: 'Token não fornecido' });
        }
        try {
            const tokenValido = jsonwebtoken_1.default.verify(token, jwtSecretKey);
            req.usuario = tokenValido;
            next();
        }
        catch (err) {
            console.log(err);
            return res.status(403).json({ error: 'Token inválido ou expirado' });
        }
    };
}
