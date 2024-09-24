import express from 'express';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import usuarioRoutes from './Controllers/UsuarioController';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const swaggerDocs = YAML.load('./swagger.yaml');

// Rota para a documentação do Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Rotas da aplicação
app.use('/ondetem', usuarioRoutes);

// Inicializar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
    console.log(`Documentação disponível em http://localhost:${port}/api-docs`);
});