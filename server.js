const express = require('express');

const projectsRouter = require('./routes/projectsRouter');
const actionsRouter = require('./routes/actionsRouter');
const helmet = require('helmet');

const server = express();

server.use(express.json());
server.use(helmet());

server.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'The server is online'
    });
});

server.use('/api/projects', projectsRouter);
server.use('/api/projects', actionsRouter);
server.use('/api/projects/:id', actionsRouter);

module.exports = server;