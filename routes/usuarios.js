const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { esRoleValido, existeEmail, existeUsuarioPorId } = require('../helpers/db-validators');

const { usuariosGet,
    usuariosPost, 
    usuariosPut,
    usuariosDelete,
    usuariosPatch } = require('../controllers/usuarios');
    
// const Role = require('../models/role');
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

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe de ser más de 6 letras').isLength({ min: 6 }),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom( existeEmail ),
    // check('rol', 'No es un rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    // check('rol').custom( async( rol = '' ) => {
    //     const existeRol = await Role.findOne({ rol });
    //     if ( !existeRol ) {
    //         throw new Error(`El rol ${ rol } no esta registrado en la BD`)
    //     }
    // }),
    check('rol').custom( esRoleValido ),
    validarCampos
],usuariosPost); // (req, res) => {
//     res.status(201).json({
//         msg: 'post API'
//     });
// });

router.put('/:id', [
    // check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    check('rol').custom( esRoleValido ),
    validarCampos
], usuariosPut); //(req, res) => {
//     res.json({ 
//         msg: 'put API'
//     });
// });

router.delete('/:id', [
    check('id').custom( existeUsuarioPorId ),
    validarCampos
], usuariosDelete); // (req, res) => {
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