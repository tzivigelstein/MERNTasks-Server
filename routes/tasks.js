const express = require('express')
const router = express.Router()
const taskDriver = require('../controllers/taskDriver')
const auth = require('../middlewares/auth')
const { check } = require('express-validator')

//Crear tarea
//api/tasks
router.post(
  '/',
  auth,
  [check('name', 'Name is required').not().isEmpty(), check('project', 'Project is required').not().isEmpty()],
  taskDriver.newTask
)

//Obtener tareas
//api/tasks
router.get('/', auth, taskDriver.getTasks)

//Actualizar tareas
//api/tasks
router.put('/:id', auth, taskDriver.updateTasks)

//Eliminar tareas
//api/tasks
router.delete('/:id', auth, taskDriver.deleteTasks)

module.exports = router
