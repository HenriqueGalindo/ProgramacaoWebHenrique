import express from 'express';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import usuarioRoutes from './Controllers/UsuarioController';
import estabelecimentoRoutes from './Controllers/EstabelecimentoController';
import tagPrimariaRoutes from './Controllers/TagPrimariaController';
import tagSecundariaRoutes from './Controllers/TagSecundariaController';


const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const swaggerDocs = YAML.load('./swagger.yaml');

// Rota para a documentação do Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Rotas da aplicação
app.use('/ondetem', usuarioRoutes);
app.use('/ondetem', estabelecimentoRoutes);
app.use('/ondetem', tagPrimariaRoutes);
app.use('/ondetem', tagSecundariaRoutes);

// Inicializar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
    console.log(`Documentação disponível em http://localhost:${port}/api-docs`);
});