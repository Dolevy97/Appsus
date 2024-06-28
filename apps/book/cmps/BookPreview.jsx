

export function BookPreview({ book, moveToBook }) {

    return (
        <div className="book-container" onClick={moveToBook}>
            <img className="book-thumbnail" src={book.thumbnail} title={book.title}></img>
        </div>
    )
}