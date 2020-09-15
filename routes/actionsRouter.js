const express = require('express');
const Actions = require('../data/helpers/actionModel.js');

const router = express.Router();

router.get('/:id/actions', (req, res) => {
    const { id } = req.params;
    Actions
        .get(id)
        .then(action => {
            res.status(200).json({
                success: true,
                data: action
            });
        })
        .catch(err => {
            res.status(500).json({
                success: false,
                err: 'Server error could not retrieve action.'
            });
        });
});

router.post('/:id/actions', (req, res) => {
    const actionInfo = { ...req.body, project_id: req.params.id }
    Actions
        .insert(actionInfo)
        .then(() => {
            res.status(201).json({
                success: true,
                message: 'Action successfully created.'
            });
        })
        .catch(err => {
            res.status(500).json({
                success: false,
                err: 'Server error action not created.'
            });
        });
});

router.delete('/actions/:id', (req, res) => {
    const { id } = req.params;

    Actions
        .remove(id)
        .then(action => {
            if (action > 0) {
                res.status(200).json({
                    success: true,
                    data: {},
                    message: 'Action successfully deleted.'
                });
            } else {
                res.status(404).json({
                    success: false,
                    message: `Action with id ${req.params.id} not found.`
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                err: 'Server error action could not be deleted.'
            });
        });
});

router.put('/actions/:id', (req, res) => {
    const { id } = req.params;
    const actionInfo = req.body;
    
    Actions
        .update(id, actionInfo)
        .then(action => {
            if (action) {
                res.status(200).json({
                    success: true,
                    data: action,
                    message: 'Action has been successfully updated.'
                })
            } else {
                res.status(404).json({
                    success: false,
                    message: `Action with id ${req.params.id} not found.`
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                success: false,
                err: 'Server error can not update action'
            });
        });
});


module.exports = router;