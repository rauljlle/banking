import express from 'express';
import bodyParser from 'body-parser';
import appRoutes from './app/controller'

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use('/', appRoutes);

app.listen(port, () => {
    console.log(`Running on port ${port}`);
});
