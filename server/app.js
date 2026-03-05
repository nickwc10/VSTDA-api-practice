const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(morgan('dev'));
app.use(express.json());

let mock =    [
        {
            todoItemId: 0,
            name: 'an item',
            priority: 3,
            completed: false
        },
        {
            todoItemId: 1,
            name: 'another item',
            priority: 2,
            completed: false
        },
        {
            todoItemId: 2,
            name: 'a done item',
            priority: 1,
            completed: true
        }
    ];

// add your code here

app.get('/api/TodoItems', (req, res) => {
    res.status(200).json(mock);
});

app.get('/api/TodoItems/:number', (req, res) => {
    const item = mock.find(i => i.todoItemId === parseInt(req.params.number));
    if (item) {
        res.status(200).json(item);
    } else {
        res.status(404).json({ error: 'Item not found' });
    }
});

app.post('/api/TodoItems', (req, res) => {
    const newItem = req.body;
    mock.push(newItem);
    res.status(201).json(newItem);
});

app.delete('/api/TodoItems/:number', (req, res) => {
    const index = mock.findIndex(i => i.todoItemId === parseInt(req.params.number));
    if (index>=0) {
        const deletedItem = mock[index];
        mock.splice(index, 1);
        res.status(200).json(deletedItem);
    } else {
        res.status(404).json({ error: 'Item not found' });
    }
});

app.get('/', (req, res) => {
    res.json({ status: 200,body:`{status:ok}` });
});

module.exports = app;
