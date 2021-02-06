// routes/project-routes.js
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Project = require('../models/project-model');
const Task = require('../models/task-model'); // <== !!!

// GET route => to get all the projects
router.get('/projects', (req, res, next) => {
	Project
		.find()
		.populate('tasks')
		.then(allProjects => {
			res.json(allProjects);
		})
		.catch(error => {
			res.status(500).json(error);
		});
});

// POST route => to create a new project
router.post('/projects', (req, res, next) => {
	Project
		.create({
			title: req.body.title,
			description: req.body.description,
			tasks: []
		})
		.then(newProject => {
			res.json(newProject);
		})
		.catch(error => {
			res.status(500).json(error);
		});
});

// GET route => to get a specific project/detailed view
router.get('/projects/:projectId', (req, res, next) => {
	if (!mongoose.Types.ObjectId.isValid(req.params.projectId)) {
		res.status(400).json({message: 'Specified ID is not valid'});
		return;
	}

	Project
		.findById(req.params.projectId)
		.populate('tasks')
		.then(project => {
			res.json(project);
		})
		.catch(error => {
			res.status(500).json(error);
		});
});

// PUT route => to update a specific project
router.put('/projects/:projectId', (req, res, next) => {
	if (!mongoose.Types.ObjectId.isValid(req.params.projectId)) {
		res.status(400).json({message: 'Specified ID is not valid'});
		return;
	}
	Project
		.findByIdAndUpdate(req.params.projectId, req.body)
		.then(() => {
			res.json({message: `Project with ${req.params.projectId} is updated successfully.`});
		})
		.catch(error => {
			res.status(500).json(error);
		});
});

// DELETE route => to delete a specific project
router.delete('/projects/:projectId', (req, res, next) => {
	if (!mongoose.Types.ObjectId.isValid(req.params.projectId)) {
		res.status(400).json({message: 'Specified ID is not valid'});
		return;
	}
	Project
		.findByIdAndRemove(req.params.projectId)
		.then(() => {
			res.json({message: `Project with ${req.params.id} is removed successfully.`});
		})
		.catch(error => {
			res.status(500).json(error);
		});
});

module.exports = router;
