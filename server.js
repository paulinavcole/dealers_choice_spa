const db = require('./db');
const {Task}  = db;
const express = require('express');
const app = express();
const path = require('path');

app.use(express.json());
app.use('/assets', express.static('assets'));
app.use('/dist', express.static('dist'));

app.get('/', (req, res)=> res.sendFile(path.join(__dirname, 'index.html')));

app.get('/api/tasks', async(req, res, next) => {
    try {
        res.send(await Task.findAll());
    }
    catch(ex) {
        next(ex);
    }
});

app.delete('/api/tasks/:id', async(req, res, next) => {
    try {
        const task = await Task.findByPk(req.params.id);
        await task.destroy();
        res.sendStatus(204);
    }
    catch(ex) {
        next(ex);
    }
});

app.post('/api/tasks', async(req, res, next) => {
    try {
        res.status(201).send(await Task.create(req.body));
    }
    catch(ex) {
        next(ex);
    }
});

app.use((err, req, res, next) =>  {
    console.log(err);
    res.status(500).send(err);
})

const init = async() => {
    try {
        await db.syncAndSeed();
        const port = process.env.PORT || 3000;
        app.listen(port, ()=> console.log(`listening on port ${port}`));
    }
    catch(ex) {
        console.log(ex)
    }
};

init();