const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';

        // Conectar a base de datos
        this.conectarDB();

        // Middlewares
        this.middlewares();

        // Rutas de la aplicación
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }

    middlewares() {
        // CORS
        this.app.use( cors() );

        // Lectura y parseo del body
        this.app.use( express.json() );

        // Directorio público
        this.app.use( express.static('public') );
    }

    routes() {

        this.app.use(this.usuariosPath, require('../routes/usuarios'));

        // this.app.get('/hola-mundo', (req, res) => {
        //     // res.send('Hello World');
        //     res.json({ 
        //         msg: 'Hello World'
        //     });
        // });

        // this.app.get('/api', (req, res) => {
        //     res.json({ 
        //         msg: 'get API'
        //     });
        // });

        // this.app.put('/api', (req, res) => {
        //     res.json({ 
        //         msg: 'put API'
        //     });
        // });

        // this.app.post('/api', (req, res) => {
        //     res.status(201).json({
        //         msg: 'post API'
        //     });
        // });

        // this.app.delete('/api', (req, res) => {
        //     res.json({ 
        //         msg: 'delete API'
        //     });
        // });

        // this.app.patch('/api', (req, res) => {
        //     res.json({ 
        //         msg: 'patch API'
        //     });
        // });
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        });
    }
}

module.exports = Server;