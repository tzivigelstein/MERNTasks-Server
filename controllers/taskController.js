const Task = require('../models/Task')
const Project = require('../models/Project')
const { validationResult } = require('express-validator')

//Crea una nueva tarea

exports.newTask = async (req, res) => {
  //Revisar el nombre del proyecto
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  try {
    //Extraer el proyecto y comprobar su existencia
    const { project } = req.body

    const existentProject = await Project.findById(project)

    if (!existentProject) {
      res.status(404).send('Project not found')
    }

    //Revisar si el proyecto pertenece al user
    if (existentProject.owner.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not permitted' })
    }

    //Crear tarea
    const task = new Task(req.body)
    await task.save()
    res.json({ task })
  } catch (error) {
    console.log(error)
    res.status(500).send('There was an error')
  }
}

//Obtener tareas por proyectos
exports.getTasks = async (req, res) => {
  try {
    //Extraer el proyecto y comprobar su existencia
    const { project } = req.query

    const existentProject = await Project.findById(project)

    if (!existentProject) {
      res.status(404).send('Project not found')
    }

    //Revisar si el proyecto pertenece al user
    if (existentProject.owner.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not permitted' })
    }

    //Obtener tareas
    const tasks = await Task.find({ project }).sort({ date: -1 })
    res.json({ tasks })
  } catch (error) {
    console.log(error)
    res.status(500).send('There was an error')
  }
}

//Actualizar tareas
exports.updateTasks = async (req, res) => {
  try {
    const { project, name, state } = req.body
    const { id } = req.params

    let task = await Task.findOne({ _id: id })

    if (!task) {
      return res.status(404).json({ msg: 'Task not found' })
    }

    //Extraer proyecto
    const existentProject = await Project.findOne({ _id: project })

    //Verificar si el proyecto le pertenece
    if (existentProject.owner.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not permited' })
    }

    //Crear un nuevo objeto
    const newTask = {}

    newTask.name = name
    newTask.state = state

    //Guardar tarea
    task = await Task.findOneAndUpdate({ _id: req.params.id }, newTask, { new: true })

    res.json({ task })
  } catch (error) {
    console.log(error)
    res.status(500).send('There was an error')
  }
}

//Eliminar tareas
exports.deleteTasks = async (req, res) => {
  try {
    //Extraer el proyecto y comprobar su existencia
    const { project } = req.query

    //Verificar la existencia de la tarea
    let task = await Task.findById(req.params.id)

    if (!task) {
      return res.status(404).json({ msg: 'Task not found' })
    }

    //Extraer proyecto
    const existentProject = await Project.findById(project)

    //Verificar si el proyecto le pertenece
    if (existentProject.owner.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not permited' })
    }

    //Eliminar
    await Task.findOneAndRemove({ _id: req.params.id })
    res.json({ msg: 'Deleted successfully' })
  } catch (error) {
    console.log(error)
    res.status(500).send('There was an error')
  }
}
