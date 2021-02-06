// routes/project-routes.js
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Project = require('../models/project-model');
const Task = require('../models/task-model');


// GET route => to retrieve a specific task
router.get('/tasks/:taskId', (req, res, next) => {
	Task.findById(req.params.taskId)
		.then(task => {
			res.json(task);
		})
		.catch(error => {
			res.status(500).json(error);
		});
});


// POST route => to create a new task
router.post('/tasks', (req, res, next) => {
	Task
		.create({
			title: req.body.title,
			description: req.body.description,
			project: req.body.projectId
		})
		.then(newTask => {
			return Project
				.findByIdAndUpdate(req.body.projectId, {
					$push: {tasks: newTask._id}
				}, {new: true});
		})
		.then(newTask => {
			res.json(newTask);
		})
		.catch(error => {
			res.status(500).json(error);
		});
});


// PUT route => to update a specific task
router.put('/tasks/:taskId', (req, res, next) => {
	if (!mongoose.Types.ObjectId.isValid(req.params.taskId)) {
		res.status(400).json({message: 'Specified id is not valid'});
		return;
	}

	Task
		.findByIdAndUpdate(req.params.taskId, req.body)
		.then(() => {
			res.json({message: `Task with ${req.params.taskId} is updated successfully.`});
		})
		.catch(error => {
			res.status(500).json(error);
		});
});

// DELETE route => to delete a specific task
router.delete('/tasks/:taskId', (req, res, next) => {
	if (!mongoose.Types.ObjectId.isValid(req.params.taskId)) {
		res.status(400).json({message: 'Specified id is not valid'});
		return;
	}

	Task
		.findByIdAndRemove(req.params.taskId)
		.then(() => {
			res.json({message: `Task with ${req.params.taskId} is removed successfully.`});
		})
		.catch(error => {
			res.status(500).json(error);
		});
});

module.exports = router;