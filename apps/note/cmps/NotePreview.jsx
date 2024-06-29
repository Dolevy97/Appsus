


export function NotePreview({ note }) {
    const { type, info } = note

    let content

  



    if (type === 'NoteTxt') {
        content = (
            <div className="text note-preview" style={note.style}>
                {info.txt}
            </div>
        )
    } else if (type === 'NoteImg') {
        content = (
            <div className="photo note-preview" style={note.style}>
                <img src={info.url} alt={info.title} />
                <h4 className="img-title">{info.title}</h4>
            </div>
        )
    }  else if (type === 'NoteTodos') {
        content = (
            <div className="todo-note-preview" style={note.style}>
                <h4>{info.title}</h4>
                <ul>
                    {info.todos.map((todo, idx) => (
                        <li key={idx}>
                            <input
                                type="checkbox"
                          
                            />
                            {todo.txt}
                        </li>
                    ))}
                </ul>
            </div>
        );
    } else if (type === 'NoteVideo') {
        content = (
            <div className="video note-preview" style={note.style}>
                <h4>{info.title}</h4>
                <iframe
                    className="video"
                    height="235"
                    src={info.url.replace('watch?v=', 'embed/')}
                    frameBorder="0"
                    allowFullScreen
                ></iframe>
            </div>
        )
    }
    return (
        <article className="note-preview">
            {content}
        </article>
    )
}



