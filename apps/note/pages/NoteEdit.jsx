

import { noteService } from "../services/note.service.js"
import { eventBusService } from '../../../services/event-bus.service.js'
import { ColorPicker } from "../cmps/ColorPicker.jsx"


const { Link, useParams, useNavigate } = ReactRouterDOM
const { useState, useEffect, useRef } = React


export function NoteEdit({ onSaveNewNote ,onRemoveNote, onChangeColor, onDuplicateNote, onChangeNote }) {
    const { noteId } = useParams()
    const [note, setNote] = useState(null)/// paly with the note 
    const [noteToEdit, setNoteToEdit] = useState(noteService.getEmptyNote())
    const [noteType, setNoteType] = useState('NoteTxt')
    const navigate = useNavigate()

    //icones
    const [colorPickerNoteId, setColorPickerNoteId] = useState(null)

   

    useEffect(() => {
        if (noteId) {
            noteService.get(noteId)
                .then(note => {
                    setNote(note)
                    setNoteType(note.type)
                    setNoteToEdit(note)

                })
                .catch(err => console.error('Error fetching note:', err))
        } else {
            setNoteToEdit(noteService.getEmptyNote())
        }
    }, [noteId])


///add to edit
    function onSaveNote(ev) {
        ev.preventDefault()
        const updatedNote = { ...noteToEdit, type: noteType }
        noteService.save(updatedNote)
            .then((savedNote) => {
                console.log('Note saved successfully:', savedNote)
                onSaveNewNote(savedNote)
                navigate('/note')
            })
            .catch(err => console.log('Error saving note:', err))
    }

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value
                break

            case 'checkbox':
                value = target.checked
                break

            default:
                break
        }

        setNoteToEdit(prevNote => ({
            ...prevNote,
            info: {
                ...prevNote.info,
                [field]: value
            }
        }))
    }


///all icones

function onDuplicateNote(note) {
    const newNote = { ...note, id: '' }

    noteService
        .save(newNote)
        .then(onChangeNote)
        .catch((err) => console.log('err', err))
}




    const { info } = noteToEdit

    if (!note) return
    return (
        <section className="edit-note">
            <h2><Link to="/note"> {noteId && (<div className="main-screen"> </div>)}</Link></h2>
            {noteId && (
                <div style={note.style} className="edit-note-container">
                    <div >

                        <div className='edit-note-section '>
                            <form onSubmit={onSaveNote}>
                                {noteType === 'NoteTxt' && (
                                    <input style={note.style}
                                        type="text"
                                        id="byText"
                                        name="txt"
                                        className="input edit-note-input"
                                        placeholder="Take a note"
                                        onChange={handleChange}
                                        value={info.txt || ''}
                                    />
                                )}
                                {noteType === 'NoteImg' && (
                                    <input style={note.style}
                                        type="url"
                                        id="byImage"
                                        name="url"
                                        className="input edit-note-input-url"
                                        placeholder="Enter image URL"
                                        onChange={handleChange}
                                        value={info.url || ''}
                                    />
                                )}
                                {noteType === 'NoteVideo' && (
                                    <input style={note.style}
                                        type="url"
                                        id="byVideo"
                                        name="url"
                                        className="input edit-note-input-url"
                                        placeholder="Enter YouTube video URL"
                                        onChange={handleChange}
                                        value={info.url || ''}
                                    />
                                )}


                                <div className="submit-icons">
                                    <button className="button-note-reset" type="submit"><span className="material-symbols-outlined sb1 ">add</span></button>
                                </div>
                            </form>
                        </div>

                        <div className="icones-display-edit">
                                 
                                    <section className="note-actions-edit">
                                        <div className="other-icons-edit">
                                            <span onClick={() => setColorPickerNoteId(noteId)} className="material-symbols-outlined icone-hover">palette</span>
                                            <span onClick={() => { onRemoveNote(noteId), navigate('/note') }} className="material-symbols-outlined icone-hover">delete</span>
                                            <span onClick={() => onDuplicateNote(note)} className="material-symbols-outlined icone-hover">content_copy</span>
                                            <span className="material-symbols-outlined icone-hover">mail</span>
                                        </div>
                                    </section>
                                </div>
                                {colorPickerNoteId === noteId && (
                                    <ColorPicker onChangeColor={(color) => onChangeColor(noteId, color, setColorPickerNoteId)} />
                                )}
                    </div>

                </div>)}
        </section>
    )
}