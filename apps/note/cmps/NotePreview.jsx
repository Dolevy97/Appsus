



export function NotePreview({ note }) {



    return (

        <section className = 'note-preview'>
            <h2>{note.type}</h2>
            <h2>{note.info.txt}</h2>
        </section>
    )
}
