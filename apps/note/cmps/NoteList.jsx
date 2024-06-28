
import { NotePreview } from "../cmps/NotePreview.jsx"
import { noteService } from "../services/note.service.js"
import { ColorPicker } from "./ColorPicker.jsx"

const { Link, Outlet } = ReactRouterDOM
const { useState, useEffect, useRef } = React

export function NoteList({ notes, onRemoveNote, onChangeColor, onDuplicateNote, onChangeNote }) {
    const [colorPickerNoteId, setColorPickerNoteId] = useState(null)
    const [notesState, setNotesState] = useState([])


    useEffect(() => {
        setNotesState(notes)
    }, [notes])


    function onDuplicateNote(note) {
        const newNote = { ...note, id: '' }

        noteService
            .save(newNote)
            .then(onChangeNote)
            .catch((err) => console.log('err', err))
    }


    function handlePinClick(noteId) {
        const updatedNotes = notesState.map(note => {
            if (note.id === noteId) {
                const updatedNote = { ...note, isPinned: !note.isPinned }
                noteService.save(updatedNote).then(onChangeNote) // Save the updated note and refresh the notes list
                return updatedNote
            }
            return note
        })
        setNotesState(updatedNotes)
    }



    const pinnedNotes = notesState.filter(note => note.isPinned)
    const unpinnedNotes = notesState.filter(note => !note.isPinned)


    return (
        <section className="note-list-container">
            {pinnedNotes.length > 0 && (
                <div className="note-list-container is-pinned">
                    <h2 className="is-pinned-title">Pinned Notes</h2>
                    <ul className="note-list">
                        {pinnedNotes.map(note => (
                            <li key={note.id} className="note-item" style={note.style}>
                                <Link replace to={`/note/${note.id}`}>
                                    <NotePreview note={note} />
                                </Link>
                                <div className="icones-display">
                                    <div className="pin-icon" onClick={() => handlePinClick(note.id)}>
                                        <span className={`material-symbols-outlined icone-hover ${note.isPinned ? 'pinned' : 'unpinned'}`}>
                                            {note.isPinned ? 'Keep_off' : 'Keep'}
                                        </span>
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
                </div>
            )}
            <div className="note-list-container">
            { unpinnedNotes.length > 0 &&
                <h2 className="is-notpinned-title">Other Notes</h2> }
                <ul className="note-list">
                    {unpinnedNotes.map(note => (
                        <li key={note.id} className="note-item" style={note.style}>
                            <Link replace to={`/note/${note.id}`}>
                                <NotePreview note={note} />
                            </Link>
                            <div className="icones-display">
                                <div className="pin-icon" onClick={() => handlePinClick(note.id)}>
                                    <span className={`material-symbols-outlined icone-hover ${note.isPinned ? 'pinned' : 'unpinned'}`}>
                                        {note.isPinned ? 'Keep_off' : 'Keep'}
                                    </span>
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
            </div>
            <section>
                <Outlet />
            </section>
        </section>
    )
}