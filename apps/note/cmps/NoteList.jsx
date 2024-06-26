
import { NotePreview } from "../cmps/NotePreview.jsx";



export function NoteList({ notes ,onSelectNoteId, onRemoveNote}) {




    return (

        <ul className = "note-list">
            {notes.map(note => (
                <li key={note.id}>
                    <NotePreview note={note} />
                 
                    <section>
                    <button onClick={() => onRemoveNote(note.id)}>Delete</button>
                    <button onClick={() => onSelectNoteId(note.id)}>Details</button>
                    </section>
                </li>
            ))}
        </ul>


    )
}
