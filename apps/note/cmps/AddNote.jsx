

const { useState, useEffect, useRef } = React

import { eventBusService } from '../../../services/event-bus.service.js'
import { noteService } from "../services/note.service.js"


export function AddNote({ onSaveNewNote }) {
    const [noteToEdit, setNoteToEdit] = useState(noteService.getEmptyNote())
    const [noteType, setNoteType] = useState('NoteTxt')


    useEffect(() => {
      setNoteToEdit(noteService.getEmptyNote(noteType))
    }, [])



    function onSaveNote(ev) {
        ev.preventDefault()
        const newNote = { ...noteToEdit, type: noteType }
        console.log(newNote);
        noteService.save(newNote)
            .then((savedNote) => {
                console.log('Note saved successfully:', savedNote)
                onSaveNewNote(savedNote)
                setNoteToEdit(noteService.getEmptyNote(noteType))
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

    function handleNoteTypeChange(type) {
        setNoteType(type)
        setNoteToEdit(noteService.getEmptyNote(type)) 
    }

    const { info } = noteToEdit
    return (
        <section className="add-note-section">
            <div className="add-note-container">
                <form onSubmit={onSaveNote}>
                    {noteType === 'NoteTxt' && (
                        <input
                            type="text"
                            id="byText"
                            name="txt"
                            className="input add-note-input"
                            placeholder="Take a text note"
                            onChange={handleChange}
                            value={info.txt || ''}
                        />
                    )}
                    {noteType === 'NoteImg' && (
                        <input
                            type="url"
                            id="byImage"
                            name="url"
                            className="input add-note-input"
                            placeholder="Enter image URL"
                            onChange={handleChange}
                            value={info.url || ''}
                        />
                    )}
                    {noteType === 'NoteVideo' && (
                        <input
                            type="url"
                            id="byVideo"
                            name="url"
                            className="input add-note-input"
                            placeholder="Enter YouTube video URL"
                            onChange={handleChange}
                            value={info.url || ''}
                        />
                    )}

                    <div className="submit-icons">
                        <button className="button-reset" type="submit"><span className="material-symbols-outlined">add</span></button>
                        <span className="material-symbols-outlined" onClick={() => handleNoteTypeChange('NoteTxt')}> text_fields </span>
                        <span className="material-symbols-outlined" onClick={() => handleNoteTypeChange('NoteImg')}> image </span>
                        <span className="material-symbols-outlined" onClick={() => handleNoteTypeChange('NoteVideo')}> youtube_activity </span>
                    </div>
                </form>
            </div>
        </section>
    )

}

