

import { noteService } from "../services/note.service.js"
import { utilService } from '../../../services/util.service.js'

import { NoteList } from "../cmps/NoteList.jsx"
import { NoteFilter } from "../cmps/NoteFilter.jsx"
import { AddNote } from "../cmps/AddNote.jsx"
import { NoteEdit } from "../pages/NoteEdit.jsx"
import { showGmailMsg } from "../../../services/event-bus.service.js"

const { useState, useEffect} = React

export function NoteIndex() {
    const [notes, setNotes] = useState()
    const [filterBy, setFilterBy] = useState(noteService.getDefaultFilter())

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
        setNotes((prevNotes) => {
            const updatedNotes = prevNotes.map(prevNote =>
                prevNote.id === note.id ? note : prevNote
            )
            return [note, ...updatedNotes.filter(prevNote => prevNote.id !== note.id)]
        })
    }

    function onRemoveNote(noteId) {
        noteService.remove(noteId).then(() => {
            setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId))
            showGmailMsg('Note Deleted Successfully🦔')
        })
    }

    function onSetFilter(filterBy) {
        setFilterBy({ ...filterBy })
    }

    function onChangeColor(noteId, color, setColorPickerNoteId) {
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

    function onChangeNote(note) {
        if (!note) {
            loadNotes()
            return
        }

        noteService
            .save(note)
            .then(() => {
                loadNotes()
            })
            .catch((err) => console.log('err:', err))
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
                    onChangeNote={onChangeNote}
                />
                <NoteEdit
                    onRemoveNote={onRemoveNote}
                    onChangeColor={onChangeColor}
                    onChangeNote={onChangeNote}
                    onSaveNewNote={onSaveNewNote}
                />
            </React.Fragment>
        </section>
    )
}
