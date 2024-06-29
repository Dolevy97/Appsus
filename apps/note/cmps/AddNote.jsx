

const { useState, useEffect, useRef } = React

import { eventBusService } from '../../../services/event-bus.service.js'
import { noteService } from "../services/note.service.js"

export function AddNote({ onSaveNewNote }) {
    const [noteToEdit, setNoteToEdit] = useState(noteService.getEmptyNote())
    const [newTodoInput, setNewTodoInput] = useState('')

    const [noteType, setNoteType] = useState('NoteTxt')

    const [isAddOpen, setIsAddOpen] = useState(false)
    const containerRef = useRef(null)

    useEffect(() => {
        function handleOutsideClick(event) {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsAddOpen(false)
            }
        }
        window.addEventListener('click', handleOutsideClick)
        return () => {
            window.removeEventListener('click', handleOutsideClick)
        }
    }, [])

    useEffect(() => {
        setNoteToEdit(noteService.getEmptyNote(noteType))
    }, [])

    function onSaveNote(ev) {
        ev.preventDefault()
        const newNote = { ...noteToEdit, type: noteType }
        noteService.save(newNote)
            .then((savedNote) => {
                onSaveNewNote(savedNote)
                setNoteToEdit(noteService.getEmptyNote(noteType))
                onCloseAdd()
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

    function handleTodoInputChange(event) {
        setNewTodoInput(event.target.value)
    }


    function handleTodoInputBlur() {
        var listTodos = newTodoInput.split(',')
        const cleanListTodos = listTodos.filter(Boolean)//thats a cool booly
        listTodos = cleanListTodos.map(txt => ({ txt: txt.trim(), doneAt: null }))
        setNoteToEdit(prevNote => ({
            ...prevNote,
            info: {
                ...prevNote.info,
                todos: [...(prevNote.info.todos || []), ...listTodos]
            }
        }))
        setNewTodoInput('')
    }


    function handleNoteTypeChange(type) {
        setNoteType(type)
        setNoteToEdit(noteService.getEmptyNote(type))
    }


    function onOpenAdd() {
        setIsAddOpen(true)
    }

    function onCloseAdd() {
        setIsAddOpen(false)
    }




    const { info } = noteToEdit
    return (
        <section className="add-note-section">
            <div className={`dummy-addNote ${isAddOpen ? 'dummy-addNote-hidden' : 'dummy-addNote-visible'}`} onClick={onOpenAdd}>
                <span>Take a note</span>
            </div>

            <div className={`add-note-container ${isAddOpen ? 'add-note-visible' : 'add-note-hidden'}`}>
                <form onSubmit={onSaveNote}>

                    <input
                        value={info.title}
                        onChange={handleChange}
                        name="title"
                        type="text"
                        className="input add-note-input-title"
                        placeholder="Title"
                    />

                    {noteType === 'NoteTxt' && (
                        <input
                            type="text"
                            id="byText"
                            name="txt"
                            className="input add-note-input"
                            placeholder="Take a note..."
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
                    {noteType === 'NoteTodos' && (
                        <div>
                            <input
                                type="text"
                                name="todos"
                                className="input add-note-input"
                                placeholder="Enter comma(,) for each todo"
                                onChange={handleTodoInputChange}
                                onBlur={handleTodoInputBlur}
                                value={newTodoInput}
                            />
                        </div>
                    )}

                    <span className="close-addnote" onClick={onCloseAdd}>X</span>
                    <div className="submit-icons">
                        <button className="button-note-reset" type="submit"><span className="material-symbols-outlined sb1 ">add</span></button>
                        <span className="material-symbols-outlined sb2" onClick={() => handleNoteTypeChange('NoteTxt')}> text_fields </span>
                        <span className="material-symbols-outlined sb3" onClick={() => handleNoteTypeChange('NoteImg')}> image </span>
                        <span className="material-symbols-outlined sb4" onClick={() => handleNoteTypeChange('NoteVideo')}> youtube_activity </span>
                        <span className="material-symbols-outlined sb5 " onClick={() => handleNoteTypeChange('NoteTodos')} >list_alt </span>

                    </div>
                </form>
            </div>
        </section>
    )

}

