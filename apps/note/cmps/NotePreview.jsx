



export function NotePreview({ note }) {



    return (

        <section className = 'note-preview'>
            <h2>{note.type}</h2>
            <h2>{note.info.txt}</h2>
            {/* <img src={`./assets/imgs/${note.info.url}.jpg`} alt='' /> */}
        </section>
    )
}
