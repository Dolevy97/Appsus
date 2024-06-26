
import { noteService } from "../services/note.service.js"
import { NoteList } from "../cmps/NoteList.jsx";


const { Link ,useSearchParams} = ReactRouterDOM
const { useState, useEffect, useRef } = React





export function NoteIndex() {

    const [notes, setNotes] = useState([])


    useEffect(() => {
        noteService.query().then(notes => {console.log(notes)})
    }, [])




    if (!notes) return <div>Loading...</div>

    return (
        <section className='book-index'>

<h1>Note List</h1>
        <NoteList
            notes={notes} />
    </section>
        
    )
}
