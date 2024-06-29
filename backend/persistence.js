import {
    v4 as uuidv4
} from 'uuid';

let _notes = [{
        id: uuidv4(),
        text: 'CPSC 2650'
    },
    {
        id: uuidv4(),
        text: 'An awesome web dev Note'
    },
];

export const notes = () => _notes;

export const addNote = (text) => {
    const newNote = {
        id: uuidv4(),
        text
    };
    _notes.push(newNote);
    return newNote;
};

export const deleteNote = (id) => {
    _notes = _notes.filter(note => note.id !== id);
};

export const updateNote = (id, text) => {
    const note = _notes.find(note => note.id === id);
    if (note) {
        note.text = text;
        return note;
    }
    return null;
};