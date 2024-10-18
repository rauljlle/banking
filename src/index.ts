import express from 'express';
import bodyParser from 'body-parser';
import appRoutes from './controller'

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use('/', appRoutes);

app.listen(port, () => {
    console.log(`Teste na porta ${port}`);
});
