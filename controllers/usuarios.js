const { response } = require('express');
// const { validationResult } = require('express-validator');

const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');

const usuariosGet = async (req, res = response) => {

    // const { q, nombre = 'No name', apyKey, page = 1, limit } = req.query;
    // res.json({ 
    //     msg: 'get API - controlador',
    //     q,
    //     nombre,
    //     apyKey,
    //     page,
    //     limit
    // });
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    // const usuarios = await Usuario.find( query )
    //     .skip(Number( desde ))
    //     .limit(Number( limite ));

    // const total = await Usuario.countDocuments( query );

    const [ total, usuarios ] = await Promise.all([
        Usuario.countDocuments( query ),
        Usuario.find( query )
            .skip(Number( desde ))
            .limit(Number( limite ))
    ]);

    res.json({
        total,
        usuarios
    });
};

const usuariosPost = async (req, res = response) => {

    // const errors = validationResult(req);
    // if ( !errors.isEmpty() ) {
    //     return res.status(400).json(errors);
    // }

    // const { nombre, edad } = req.body;
    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });

    // Verificar si el correo existe
    // const existeEmail = await Usuario.findOne({ correo });
    // if ( existeEmail ) {
    //     return res.status(400).json({
    //         msg: 'Ese correo ya esta registrado'
    //     });
    // }

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt );

    //Guardar DB
    await usuario.save();

    res.json({
        msg: 'post API - controlador',
        usuario
    });
};

const usuariosPut = async (req, res = response) => {

    const { id } = req.params;
    const { _id, password, google, correo, ...resto } = req.body;
    
    // TODO: validar contra base de datos
    if ( password ) {
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt );
    }

    const usuario = await Usuario.findByIdAndUpdate( id, resto );

    // res.json({ 
    //     msg: 'put API - controlador',
    //     usuario
    // });
    res.json( usuario );
};

const usuariosDelete = async (req, res = response) => {

    const { id } = req.params;

    // Fisicamente lo borramos
    // const usuario = await Usuario.findByIdAndDelete( id );

    const usuario = await Usuario.findByIdAndUpdate( id, { estado: false } );

    res.json({ 
        usuario
    });
}

const usuariosPatch = (req, res = response) => {
    res.json({ 
        msg: 'patch API - controlador'
    });
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete,
    usuariosPatch
}