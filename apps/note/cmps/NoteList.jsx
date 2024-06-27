
import { NotePreview } from "../cmps/NotePreview.jsx"
import { noteService } from "../services/note.service.js"
import { ColorPicker } from "./ColorPicker.jsx"

const { Link, Outlet } = ReactRouterDOM
const { useState, useEffect, useRef } = React

export function NoteList({ notes, onRemoveNote, onChangeColor, onDuplicateNote }) {
    const [colorPickerNoteId, setColorPickerNoteId] = useState(null)
    const [notesState, setNotesState] = useState([])

    useEffect(() => {
        setNotesState(notes)
    }, [notes])


    function handlePinClick(note) {
        console.log(note)
    }

    return (
        <section className="note-list-container">
            <ul className="note-list">
                {notesState.map(note => (
                    <li key={note.id} className="note-item" style={note.style} >
                        <Link replace to={`/note/${note.id}`}>
                            <NotePreview note={note} />
                        </Link>
                        <div className="icones-display">
                            <div className="pin-icon" onClick={(ev) => handlePinClick(note.id)}>
                                <span className="material-symbols-outlined icone-hover">{note.isPinned ? 'keep' : 'keep'}</span>
                            </div>
                            <section className="note-actions">
                                <div className="other-icons">
                                    <span onClick={() => setColorPickerNoteId(note.id)} className="material-symbols-outlined icone-hover">palette</span>
                                    <span onClick={() => onRemoveNote(note.id)} className="material-symbols-outlined icone-hover">delete</span>
                                    <span onClick={() => onDuplicateNote(note)} className="material-symbols-outlined icone-hover">content_copy</span>
                                    <span className="material-symbols-outlined icone-hover">mail</span>
                                </div>
                            </section>
                        </div>
                        {colorPickerNoteId === note.id && (
                            <ColorPicker onChangeColor={(color) => onChangeColor(note.id, color, setColorPickerNoteId)} />
                        )}
                    </li>
                ))}
            </ul>
            <section>
                <Outlet />
            </section>
        </section >
    )
}