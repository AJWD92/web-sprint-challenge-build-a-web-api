const express = require('express');
const Projects = require('../data/helpers/projectModel.js');

const router = express.Router();

router.get('/', (req, res) => {
    Projects
        .get(req.id)
        .then(project => {
            res.status(200).json({
                success: true,
                data: project
            });
        })
        .catch(err => {
            res.status(500).json({
                success: false,
                err: 'Error retrieving projects data from api.'
            });
        });
});

router.post('/', (req, res) => {
    const projectInfo = req.body;
    Projects
        .insert(projectInfo)
        .then(() => {
            res.status(201).json({
                success: true,
                message: 'Project successfully created.'
            });
        })
        .catch(err => {
            res.status(500).json({
                success: false,
                err: 'Server error project not created.'
            });
        });
});

router.delete('/:id', (req, res) => {
    const { id } = req.params
    
    Projects
        .remove(id)
        .then(project => {
            if (project > 0) {
                res.status(200).json({
                    success: true,
                    data: {},
                    message: 'Project successfully deleted.'
                });
            } else {
                res.status(404).json({
                    success: false,
                    message: `Project with id ${req.params.id} not found.`
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                success: false,
                err: 'Server error project could not be deleted.'
            });
        });
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const projectInfo = req.body;
    
    Projects
        .update(id, projectInfo)
        .then(project => {
            if (project) {
                res.status(200).json({
                    success: true,
                    data: project,
                    message: 'Project has been updated.'
                })
            } else {
                res.status(404).json({
                    success: false,
                    message: `Project with id ${req.params.id} not found.`
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                success: false,
                err: 'Server error can not update project'
            });
        });
});

router.get('/:id/actions', (req, res) => {
    const { id } = req.params;

    Projects
        .getProjectActions(id)
        .then(actions => {
            res.status(200).json({
                success: true,
                data: actions
            });
        })
        .catch(err => {
            res.status(500).json({
                success: false,
                err: `Server error could not get actions of project with an id of ${req.params.id}.`
            });
        });
});

module.exports = router;