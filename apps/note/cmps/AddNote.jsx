

const { useNavigate, useParams, useSearchParams } = ReactRouterDOM
const { useState, useEffect, useRef } = React

import { eventBusService } from '../../../services/event-bus.service.js'
import { noteService } from "../services/note.service.js"
import { Accordion } from "../cmps/Accordion.jsx"


export function AddNote({ onSaveNewNote }) {
    const [noteToEdit, setNoteToEdit] = useState(noteService.getEmptyNote())


    function onSaveNote(ev) {
        ev.preventDefault()
        noteService.save(noteToEdit)
            .then((note) => {
                console.log('Note saved successfully:', note)
                onSaveNewNote(note)
            })
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
        if (field === 'txt' || field === 'title' || field === 'url') {///for all types
        setNoteToEdit(prevNote => ({ ...prevNote, [field]: value }))
    }
    return
    }



    const { title } = noteToEdit

    return (
        <section className="add-note-section" >
            <div className="add-note-container">
            {/* <Accordion title="Take a note"> */}
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

                    <div className="submit-icones">
                        <button className="button-reset " type="submit"><span className="material-symbols-outlined">add</span></button>
                        <span className="material-symbols-outlined"> text_fields </span>
                        <span className="material-symbols-outlined"> image  </span>
                        <span className="material-symbols-outlined"> youtube_activity </span>
                        <span className="material-symbols-outlined">list_alt </span>
                    </div>
                </form>
                {/* </Accordion> */}
            </div>
        </section>
    )

}


// function DynamicCmp(props) {
//     switch (props.cmpType) {
//         case 'hello':
//             return <Hello {...props} />
//         case 'goodbye':
//             return <GoodBye {...props} />
//         case 'welcomeBack':
//             return <WelcomeBack {...props} />
//         default:
//             return null
//     }
// }
