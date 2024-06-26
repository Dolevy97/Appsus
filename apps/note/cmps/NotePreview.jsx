



export function NotePreview({ note }) {



    return (

        <section style ={note.style} className='note-preview'>
            <h3>{note.type}</h3>
            <p>{note.info.txt}</p>
            {/* <img src={`./assets/imgs/${note.info.url}.jpg`} alt='' /> */}
        </section>
    )
}
