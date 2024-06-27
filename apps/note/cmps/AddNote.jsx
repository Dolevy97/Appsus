

const { useNavigate, useParams, useSearchParams } = ReactRouterDOM
const { useState, useEffect,useRef } = React

import { eventBusService } from '../../../services/event-bus.service.js'
import { noteService } from "../services/note.service.js"


export function AddNote( {onSaveNewNote}) {
    const [noteToEdit, setNoteToEdit] = useState(noteService.getEmptyNote())



    function onSaveNote(ev) {
        ev.preventDefault()
        noteService.save(noteToEdit)
            .then((note) => {
                console.log('Note saved successfully:', note)
                onSaveNewNote(note)})
            .catch(err => console.log('err:', err))
    }


    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value
                break;

            case 'checkbox':
                value = target.checked
                break

            default:
                break;
        }

        setNoteToEdit(prevNote => ({ ...prevNote, [field]: value }))
    }


    const { title } = noteToEdit

    return (
        <section className="add-note-container">
            <form onSubmit={onSaveNote}>
                <label htmlFor="byText"></label>
                <input
                    type="text"
                    id="byText"
                    name="title"
                    className="input add-note-input"
                    placeholder="Take a note"
                    onChange={handleChange} value={title}
                />
                <button type="submit">Save</button>
            </form>
        </section>
    )

}