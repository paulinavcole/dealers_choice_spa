const db = require('./db');
const {toDo}  = db;
const express = require('express');
const app = express();
const path = require('path');

app.use(express.json());
app.use('/assets', express.static('assets'));
app.use('/dist', express.static('dist'));

app.get('/', (req, res)=> res.sendFile(path.join(__dirname, 'index.html')));

app.get('/api/todos', async(req, res, next) => {
    try {
        res.send(await toDo.findAll());
    }
    catch(ex) {
        next(ex);
    }
});


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