

import { noteService } from "../services/note.service.js"
import { utilService } from '../../../services/util.service.js'

import { NoteList } from "../cmps/NoteList.jsx"
import { NoteFilter } from "../cmps/NoteFilter.jsx"
import { AddNote } from "../cmps/AddNote.jsx"
import { NoteEdit } from "../pages/NoteEdit.jsx"

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
            setNotes((prevNotes) => [note, ...prevNotes])
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

    function onChangeColor(noteId, color,setColorPickerNoteId) {
        const noteToUpdate = notes.find(note => note.id === noteId)
        if (!noteToUpdate) return

        const updatedNote = {
            ...noteToUpdate,
            style: {
                ...noteToUpdate.style,
                backgroundColor: color,
            },
        }

        noteService.save(updatedNote).then(savedNote => {
            const updatedNotes = notes.map(note =>
                note.id === savedNote.id ? savedNote : note
            )
            setNotes(updatedNotes)
            setColorPickerNoteId(null)
        }).catch(error => {
            console.error('Error saving note:', error)
        })
    }

   
    function onDuplicateNote(note) {
        const emptyNote = noteService.getEmptyNote()
    
        const newNote = {
            ...emptyNote,
            type: note.type, 
            style: {
                ...note.style, 
                backgroundColor: note.style.backgroundColor, 
            },
            info: {
                ...note.info, 
                txt: note.info.txt, 
            },
        }
    
        noteService.save(newNote)
            .then(() => {
                setNotes((prevNotes) => [...prevNotes, newNote] )
            })
            .catch((err) => console.log('Error duplicating note:', err))
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
                    onSelectNoteId={onSelectNoteId}
                    onChangeColor={onChangeColor}
                    onDuplicateNote={onDuplicateNote}
                />
                {/* <NoteEdit
                     onRemoveNote={onRemoveNote}
                     onSelectNoteId={onSelectNoteId}
                     onChangeColor={onChangeColor}
                     onDuplicateNote={onDuplicateNote}
                /> */}
            </React.Fragment>
        </section>

    )
}
