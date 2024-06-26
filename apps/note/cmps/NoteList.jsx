
import { NotePreview } from "../cmps/NotePreview.jsx";



export function NoteList({ notes }) {




    return (

        <ul className = "note-list">
            {notes.map(note => (
                <li key={note.id}>
                    <NotePreview note={note} />
                 
                    <section>
                        <button >Remove</button>
                        <button >Details</button>
                    </section>
                </li>
            ))}
        </ul>


    )
}
