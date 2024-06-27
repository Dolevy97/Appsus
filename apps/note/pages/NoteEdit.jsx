

import { noteService } from "../services/note.service.js"
import { eventBusService } from '../../../services/event-bus.service.js'


const { Link, useParams } = ReactRouterDOM
const { useState, useEffect, useRef } = React


export function NoteEdit({setColorPickerNoteId,onRemoveNote,onDuplicateNote}) {
    const { noteId } = useParams()
    const [note, setNote] = useState(null)/// paly with the note 

    useEffect(() => {
        noteService.get(noteId)
            .then(setNote)
    }, [])

   

    if (!note) return <div className="loader-container"> <div className="loader"></div> </div>
    return (
        <section className="edit-note">
            <h2><Link to="/note"><div className="main-screen"> </div></Link></h2>
            <div style={note.style} className="edit-note-container">
                <div >
                <input name="title" type="text" placeholder="Title" value=""/>
                    <p>{note.info.txt}</p>


                    <div className="pin-icon">
                        <span className="material-symbols-outlined icone-hover">keep</span>
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

            </div>
        </section>
    )
}