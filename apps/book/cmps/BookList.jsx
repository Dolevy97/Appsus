const { Link, useNavigate } = ReactRouterDOM
const { useRef } = React;

import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"

import { BookPreview } from "./BookPreview.jsx";

export function BookList({ books, onRemoveBook }) {

    const bookRef = useRef({})
    const navigate = useNavigate()

    function moveToBook(bookId) {
        navigate(`/book/${bookId}`)
    }

    return (
        <section className="books-container">
            {books.map(book =>
                <div key={book.id} ref={(el) => bookRef.current[book.id] = el}>
                    <BookPreview book={book} moveToBook={() => moveToBook(book.id)} />

                    <section className="book-actions">
                        <h4>{book.listPrice.amount} {book.listPrice.currencyCode}</h4>
                        <section className="btns">
                            <Link to={`/book/edit/${book.id}`}><button>Edit</button></Link>
                            <button onClick={() => onRemoveBook(book.id, bookRef.current[book.id])}>Remove</button>
                        </section>
                    </section>
                </div>)}
        </section >
    )
}