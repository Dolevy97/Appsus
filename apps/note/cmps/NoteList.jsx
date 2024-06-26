
import { NotePreview } from "../cmps/NotePreview.jsx"
import { noteService } from "../services/note.service.js"
import { ColorPicker } from "./ColorPicker.jsx"

const { useState, useEffect, useRef } = React

export function NoteList({ notes, onSelectNoteId, onRemoveNote }) {
    const [currNotes, setCurrNotes] = useState(notes)
    const [colorPickerNoteId, setColorPickerNoteId] = useState(null)
    // const [pickedColors, setPickedColors] = useState({})



    useEffect(() => {
        setCurrNotes(notes)
    }, [notes])


    function onChangeColor(noteId, color) {
        noteService.get(noteId).then(note => {
            const newNote = { ...note, style: { backgroundColor: color } }
            noteService.save(newNote).then(() => {
                setCurrNotes(prevNotes =>({ ...prevNotes, style: { backgroundColor: color }}))
                setColorPickerNoteId(null)
            })
        })
    }



    return (
        <section className="note-list-container">
            <ul className="note-list">
                {notes.map(note => (
                    <li key={note.id} className="note-item" style={note.style} >
                        <NotePreview note={note} />

                        <section className='note-actions'>
                            <button onClick={() => onRemoveNote(note.id)}>Delete</button>
                            <button >Details</button>
                            <button onClick={() => setColorPickerNoteId(note.id)}>Colors</button>                    <button >Copy</button>
                            <button >Send</button>
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
