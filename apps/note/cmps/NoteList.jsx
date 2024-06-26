
import { NotePreview } from "../cmps/NotePreview.jsx"
import { noteService } from "../services/note.service.js"
import { ColorPicker } from "./ColorPicker.jsx"

const { useState, useEffect, useRef } = React

export function NoteList({ notes, onSelectNoteId, onRemoveNote }) {
    const [colorPickerNoteId, setColorPickerNoteId] = useState(null)
    const [notesState, setNotesState] = useState([])

    useEffect(() => {
        setNotesState(notes)
    }, [notes])

    function onChangeColor(noteId, color) {
        const noteToUpdate = notesState.find(note => note.id === noteId)
        if (!noteToUpdate) return

        const updatedNote = {
            ...noteToUpdate,
            style: {
                ...noteToUpdate.style,
                backgroundColor: color
            }
        }

        noteService.save(updatedNote).then(savedNote => {
            const updatedNotes = notesState.map(note =>
                note.id === savedNote.id ? savedNote : note
            )
            setNotesState(updatedNotes)
        }).catch(error => {
            console.error('Error saving note:', error)
        })
        setColorPickerNoteId(null)
    }

    return (
        <section className="note-list-container">
            <ul className="note-list">
                {notesState.map(note => (
                    <li key={note.id} className="note-item" style={note.style} >
                        <NotePreview note={note} />

                        <section className='note-actions'>
                            <button onClick={() => onRemoveNote(note.id)}>Delete</button>
                            <button>Details</button>
                            <button onClick={() => setColorPickerNoteId(note.id)}>Colors</button>
                            <button>Copy</button>
                            <button>Send</button>
                        </section>
                        {colorPickerNoteId === note.id && (
                            <ColorPicker onChangeColor={(color) => onChangeColor(note.id, color)} />
                        )}
                    </li>
                ))}
            </ul>
        </section>
    )
}