const Project = require('../models/Project')
const Task = require('../models/Task')
const { validationResult } = require('express-validator')

exports.newProject = async (req, res) => {
  //Revisar el nombre del proyecto
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  try {
    //Crear un nuevo projecto
    const project = new Project(req.body)

    //Guardar el creador por JWT
    project.owner = req.user.id

    //Se guarda el proyecto
    project.save()
    res.json(project)
  } catch (error) {
    console.log(error)
    res.status(500).send('There was an error')
  }
}

//Obtiene todos los proyectos del user
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ owner: req.user.id })
    res.json(projects)
  } catch (error) {
    console.log(error)
    res.status(500).send('There was an error')
  }
}

//Actualizar un proyecto
exports.updateProject = async (req, res) => {
  //Revisar el nombre del proyecto
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  //Extraer la informacion del proyecto
  const { name } = req.body
  const newProject = {}
  if (name) {
    newProject.name = name
  }

  try {
    //Revisar id
    let project = await Project.findById(req.params.id)

    //Revisar si existe el proyecto
    if (!project) {
      return res.status(404).json({ msg: 'Project not found' })
    }

    //Verificar el creador del proyecto
    if (project.owner.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not permitted' })
    }

    //Actualizar
    project = await Project.findByIdAndUpdate({ _id: req.params.id }, { $set: newProject }, { new: true })
    res.json({ project })
  } catch (error) {
    console.log(error)
    res.status(500).send('There was an error')
  }
}

//Eliminar un proyecto
exports.deleteProject = async (req, res) => {
  try {
    //Revisar id
    let project = await Project.findById(req.params.id)

    //Revisar si existe el proyecto
    if (!project) {
      return res.status(404).json({ msg: 'Project not found' })
    }

    //Verificar el creador del proyecto
    if (project.owner.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not permitted' })
    }

    //Eliminar el proyecto
    await Project.findOneAndRemove({ _id: req.params.id })
    res.json({ msg: 'Deleted' })
  } catch (error) {
    console.log(error)
    res.status(500).send('There was an error')
  }
}
