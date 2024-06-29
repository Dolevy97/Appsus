
const { Link, useParams, useNavigate } = ReactRouterDOM
const { useState, useEffect, useRef } = React

import { noteService } from "../services/note.service.js"
import { eventBusService } from '../../../services/event-bus.service.js'
import { ColorPicker } from "../cmps/ColorPicker.jsx"

export function NoteEdit({ onSaveNewNote, onRemoveNote, onChangeColor,
    onDuplicateNote, onChangeNote, }) {

    const { noteId } = useParams()
    const [note, setNote] = useState(null)/// paly with the note 
    const [noteToEdit, setNoteToEdit] = useState(noteService.getEmptyNote())
    const [newTodoInput, setNewTodoInput] = useState('')
    const [noteType, setNoteType] = useState('NoteTxt')
    const navigate = useNavigate()
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



    function handleTodoInputChange(event) {
        setNewTodoInput(event.target.value)
    }

    function handleTodoInputBlur() {
        const listTodos = newTodoInput.split(',').map(txt => ({ txt: txt.trim(), doneAt: null }))
        setNoteToEdit(prevNote => ({
            ...prevNote,
            info: {
                ...prevNote.info,
                todos: [...(prevNote.info.todos || []), ...listTodos]
            }
        }))
        setNewTodoInput('')
    }

    function handleCheckboxChange(todoIdx) {
        setNoteToEdit(prevNote => {
            const updatedTodos = prevNote.info.todos.map((todo, idx) => {
                if (idx === todoIdx) {
                    return {
                        ...todo,
                        doneAt: todo.doneAt ? null : Date.now() // 
                    }
                }
                return todo
            })

            const updatedNote = {
                ...prevNote,
                info: {
                    ...prevNote.info,
                    todos: updatedTodos
                }
            }

            // Save the updated note to local storage
            noteService.save(updatedNote)
                .then((savedNote) => {
                    console.log('Note saved successfully:', savedNote)
                    setNoteToEdit(savedNote)
                    onChangeNote(savedNote)
                })
                .catch(err => console.log('Error saving note:', err))
            return updatedNote
        })
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
                    <div className="edit-note-section-for-input ">

                        <div className='edit-note-section '>
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
                                {noteType === 'NoteTodos' && (
                                    <div>
                                        <input
                                            type="text"
                                            name="todos"
                                            className="input add-note-input"
                                            placeholder="Enter comma(,) for each new todo"
                                            onChange={handleTodoInputChange}
                                            onBlur={handleTodoInputBlur}
                                            value={newTodoInput}
                                        />
                                        <ul>
                                            {(info.todos || []).map((todo, idx) => (
                                                <li key={idx}>
                                                    <input
                                                        type="checkbox"
                                                        checked={!!todo.doneAt}
                                                        onChange={() => handleCheckboxChange(idx)}
                                                    />
                                                    {todo.txt}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                                <div className="submit-icons-edit">
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