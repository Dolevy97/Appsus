

import { noteService } from "../services/note.service.js"

import { NoteList } from "../cmps/NoteList.jsx";
import { NoteFilter } from "../cmps/NoteFilter.jsx";
import { AddNote } from "../cmps/AddNote.jsx";


const { Link, useSearchParams } = ReactRouterDOM
const { useState, useEffect, useRef } = React





export function NoteIndex() {

    const [notes, setNotes] = useState()
    const [filterBy, setFilterBy] = useState(noteService.getDefaultFilter())
    // const debounceLoadBooks = useRef(utilService.debounce(loadMails, 300))




    useEffect(() => {
        loadNotes()
    }, [filterBy])


    function loadNotes() {
        noteService.query(filterBy)
            .then(notes => setNotes(notes))
            .catch(err => {
                console.log('err:', err)
            })
    }


    function onSaveNewNote(note) {
        noteService.save(note).then(() => {
            setNotes((prevNotes) => [...prevNotes, note])
        })
    }

    function onSelectNoteId(noteId) {
        setSelectedBookId(noteId)
    }

    function onRemoveNote(noteId) {
        noteService.remove(noteId).then(() => {
            setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId))
        })
    }

    function onSetFilter(filterBy) {
        setFilterBy({ ...filterBy })
    }

    
    if (!notes) return <div className="loader-container"> <div className="loader"></div> </div>
    return (
        <section className='note-index'>
            <React.Fragment>
                <NoteFilter
                    filterBy={filterBy} onSetFilter={onSetFilter} />
                <AddNote onSaveNewNote={onSaveNewNote} />
                <NoteList
                    notes={notes}
                    onRemoveNote={onRemoveNote}
                    onSelectNoteId={onSelectNoteId} />
            </React.Fragment>
        </section>

    )
}
