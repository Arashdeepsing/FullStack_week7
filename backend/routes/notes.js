import express from 'express';
import {
    notes,
    addNote,
    deleteNote,
    updateNote
} from '../persistence.js';

const router = express.Router();

router.get('/', (req, res) => {
    res.json(notes());
});

router.post('/', (req, res) => {
    const note = addNote(req.body.text);
    res.status(201).json(note);
});

router.delete('/:id', (req, res) => {
    deleteNote(req.params.id);
    res.status(204).end();
});

router.patch('/:id', (req, res) => {
    const updatedNote = updateNote(req.params.id, req.body.text);
    if (updatedNote) {
        res.status(200).json(updatedNote);
    } else {
        res.status(404).json({
            error: 'Note not found'
        });
    }
});

export default router;