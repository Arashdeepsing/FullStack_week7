import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import {
    v4 as uuidv4
} from 'uuid';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

let notes = [{
        id: uuidv4(),
        text: 'CPSC 2650'
    },
    {
        id: uuidv4(),
        text: 'An awesome web dev Note'
    },
];

app.get('/notes', (req, res) => {
    res.json(notes);
});

app.post('/notes', (req, res) => {
    const note = {
        id: uuidv4(),
        text: req.body.text
    };
    notes.push(note);
    res.status(201).json(note);
});

app.delete('/notes/:id', (req, res) => {
    notes = notes.filter(note => note.id !== req.params.id);
    res.status(204).end();
});

app.patch('/notes/:id', (req, res) => {
    const note = notes.find(note => note.id === req.params.id);
    if (note) {
        note.text = req.body.text;
        res.status(200).json(note);
    } else {
        res.status(404).json({
            error: 'Note not found'
        });
    }
});

app.post('/generate-image', async (req, res) => {
    const noteText = req.body.text;
    const response = await fetch(`https://api.unsplash.com/search/photos?query=${noteText}&client_id=${process.env.UNSPLASH_ACCESS_KEY}`);
    const data = await response.json();

    if (data.results.length > 0) {
        const image = data.results[0];
        res.json({
            imageUrl: image.urls.small,
            author: {
                name: image.user.name,
                link: image.user.links.html,
            },
        });
    } else {
        res.status(404).json({
            error: 'Image not found'
        });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});