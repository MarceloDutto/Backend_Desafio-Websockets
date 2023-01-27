import express from 'express';
import handlebars from 'express-handlebars';
import morgan from 'morgan';
import { Server } from 'socket.io'
import router from './router/index.js';
import __dirname from './utils.js';

const port = 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));

app.engine('handlebars', handlebars.engine({
    defaultLayout: '' //Nota: Esto lo tengo que agregar porque si no me lanza un error de que no encuentra la ruta.
}));

app.set('views', __dirname + '/views');


router(app);


const httpServer = app.listen(port, () => {
    console.log(`Server running at ${port}`);
})

export const io = new Server(httpServer);