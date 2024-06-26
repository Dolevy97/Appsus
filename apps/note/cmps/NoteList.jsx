
import { NotePreview } from "../cmps/NotePreview.jsx";



export function NoteList({ notes ,onSelectNoteId, onRemoveNote}) {




    return (
<section className = "note-list-container">
        <ul className = "note-list">
            {notes.map(note => (
                <li key={note.id} className="note-item" style ={note.style} >
                    <NotePreview note={note} />
                 
                    <section className='note-actions'>
                    <button onClick={() => onRemoveNote(note.id)}>Delete</button>
                    <button >Details</button>
                    <button >Colors</button>
                    <button >Copy</button>
                    <button >Delete</button>
                    <button >Send</button>
                    </section>
                </li>
            ))}
        </ul>
        </section>

    )
}
