const express = require('express')
const router = express.Router()
const projectController = require('../controllers/projectController')
const auth = require('../middlewares/auth')
const { check } = require('express-validator')

//Crear projectos
//api/projects
router.post('/', auth, [check('name', 'Project name is required').not().isEmpty()], projectController.newProject)

router.get('/', auth, projectController.getProjects)

router.put('/:id', auth, [check('name', 'Project name is required').not().isEmpty()], projectController.updateProject)

router.delete('/:id', auth, projectController.deleteProject)

module.exports = router
