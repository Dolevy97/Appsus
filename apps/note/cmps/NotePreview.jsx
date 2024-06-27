



export function NotePreview({ note }) {


    // const { type, info } = note

    // let content
    // if (type === 'NoteTxt') {
    //     content = (
    //         <div className="text note-preview" style={note.style}>
    //             {info.txt}
    //         </div>
    //     )

    // } else if (type === 'NoteImg') {
    //     content = (
    //         <div className="photo note-preview" style={note.style}>
    //             <img src={info.url} alt={info.title} />
    //             <h4>{info.title}</h4>
    //         </div>
    //     )
    // } else if (type === 'NoteTodos') {
    //     content = (
    //         <div className="todo note-preview" style={note.style}>
    //             <h4>{info.title}</h4>
    //             <ul>
    //                 {info.todos.map((todo, idx) => (
    //                     <li key={idx}>
    //                         {todo.txt} {todo.doneAt ? '(Done)' : '(Pending)'}
    //                     </li>
    //                 ))}
    //             </ul>
    //         </div>
    //     )
    // }

    return (

        <section style ={note.style} className='note-preview'>
            <h3>{note.type}</h3>
            <p>{note.info.txt}</p>
            {/* <img src={`./assets/imgs/${note.info.url}.jpg`} alt='' /> */}
        </section>
    )
}






