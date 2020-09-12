const express = require('express');

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

module.exports = server;