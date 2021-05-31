const { Router } = require('express');

const { usuariosGet,
        usuariosPost, 
        usuariosPut,
        usuariosDelete,
        usuariosPatch } = require('../controllers/usuarios');

const router = Router();

router.get('/hola-mundo', (req, res) => {
    // res.send('Hello World');
    res.json({ 
        msg: 'Hello World'
    });
});

router.get('/', usuariosGet); //(req, res) => {
//     res.json({ 
//         msg: 'get API'
//     });
// });

router.post('/', usuariosPost); // (req, res) => {
//     res.status(201).json({
//         msg: 'post API'
//     });
// });

router.put('/:id', usuariosPut); //(req, res) => {
//     res.json({ 
//         msg: 'put API'
//     });
// });

router.delete('/', usuariosDelete); // (req, res) => {
//     res.json({ 
//         msg: 'delete API'
//     });
// });

router.patch('/', usuariosPatch); // (req, res) => {
//     res.json({ 
//         msg: 'patch API'
//     });
// });

module.exports = router;