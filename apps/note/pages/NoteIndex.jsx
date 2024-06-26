
import { noteService } from "../services/note.service.js"
import { NoteList } from "../cmps/NoteList.jsx";
import { NoteFilter } from "../cmps/NoteFilter.jsx";
import { AddNote } from "../cmps/AddNote.jsx";


const { Link, useSearchParams } = ReactRouterDOM
const { useState, useEffect, useRef } = React





export function NoteIndex() {

    const [notes, setNotes] = useState([])


    useEffect(() => {
        noteService.query().then(notes => { setNotes(notes) })
    }, [])


    function onSelectNoteId(noteId) {
        setSelectedBookId(noteId)
    }
    function onRemoveNote(noteId) {
        noteService.remove(noteId).then(() => {
            setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId))
        })
    }



    if (!notes) return <div>Loading...</div>

    return (
        <section className='note-index'>
            <React.Fragment>
                <NoteFilter/>
                <AddNote/>
                    <NoteList
                        notes={notes}
                        onRemoveNote={onRemoveNote}
                        onSelectNoteId={onSelectNoteId} />
            </React.Fragment>
        </section>

    )
}
