const Project = require('../models/Project')
const { validationResult } = require('express-validator')
const getRandomColor = require('../helpers/getRandomColor')
const colors = require('../colors')

exports.createProject = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  try {
    const { name, colorId } = req.body

    const newProject = new Project({ name, owner: req.user.id })

    const color = colors.find(color => color.id === colorId)

    newProject.colors = color || getRandomColor()

    newProject.save()
    res.json(newProject)
  } catch (error) {
    console.log(error)
    res.status(500).send('There was an error')
  }
}

exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ owner: req.user.id })
    const parsedProjects = projects.map(({ _id, colors, date, name, icon, owner }) => ({
      id: _id,
      colors,
      date,
      name,
      icon,
      owner,
    }))

    res.json(parsedProjects)
  } catch (error) {
    console.log(error)
    res.status(500).send('There was an error')
  }
}

exports.updateProject = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const { name } = req.body
  const newProject = {}
  if (name) {
    newProject.name = name
  }

  try {
    let project = await Project.findById(req.params.id)

    if (!project) {
      return res.status(404).json({ msg: 'Project not found' })
    }

    if (project.owner.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not permitted' })
    }

    project = await Project.findByIdAndUpdate({ _id: req.params.id }, { $set: newProject }, { new: true })
    res.json({ project })
  } catch (error) {
    console.log(error)
    res.status(500).send('There was an error')
  }
}

exports.deleteProject = async (req, res) => {
  try {
    let project = await Project.findById(req.params.id)

    if (!project) {
      return res.status(404).json({ msg: 'Project not found' })
    }

    if (project.owner.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not permitted' })
    }

    await Project.findOneAndRemove({ _id: req.params.id })
    res.json({ msg: 'Deleted' })
  } catch (error) {
    console.log(error)
    res.status(500).send('There was an error')
  }
}
