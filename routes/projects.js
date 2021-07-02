const express = require('express')
const router = express.Router()
const projectDriver = require('../controllers/projectDriver')
const auth = require('../middlewares/auth')
const { check } = require('express-validator')

//Crear projectos
//api/projects
router.post('/', auth, [check('name', 'Project name is required').not().isEmpty()], projectDriver.newProject)

router.get('/', auth, projectDriver.getProjects)

router.put('/:id', auth, [check('name', 'Project name is required').not().isEmpty()], projectDriver.updateProject)

router.delete('/:id', auth, projectDriver.deleteProject)

module.exports = router
