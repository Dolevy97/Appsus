
import { NotePreview } from "../cmps/NotePreview.jsx";



export function NoteList({ notes ,onSelectNoteId, onRemoveNote}) {




    return (
<section className = "note-list-container">
        <ul className = "note-list">
            {notes.map(note => (
                <li key={note.id}>
                    <NotePreview note={note} />
                 
                    <section>
                    <button onClick={() => onRemoveNote(note.id)}>Delete</button>
                    <button >Details</button>
                    </section>
                </li>
            ))}
        </ul>
        </section>

    )
}
