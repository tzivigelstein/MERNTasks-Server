const express = require('express')
const router = express.Router()
const taskController = require('../controllers/taskController')
const auth = require('../middlewares/auth')
const { check } = require('express-validator')

//Crear tarea
//api/tasks
router.post(
  '/',
  auth,
  [check('name', 'Name is required').not().isEmpty(), check('project', 'Project is required').not().isEmpty()],
  taskController.newTask
)

//Obtener tareas
//api/tasks
router.get('/', auth, taskController.getTasks)

//Actualizar tareas
//api/tasks
router.put('/:id', auth, taskController.updateTasks)

//Eliminar tareas
//api/tasks
router.delete('/:id', auth, taskController.deleteTasks)

module.exports = router
