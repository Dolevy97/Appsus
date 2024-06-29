const { Link, useSearchParams } = ReactRouterDOM
const { useState, useEffect } = React;

import { BookFilter } from "../cmps/BookFilter.jsx";
import { BookList } from "../cmps/BookList.jsx";
import { bookService } from "../services/book.service.js";
import { showSuccessMsg } from "../../../services/event-bus.service.js"
import { utilService } from '../../../services/util.service.js'
import { BookAppHeader } from "../cmps/BookAppHeader.jsx";

export function BookIndex() {
    const [books, setBooks] = useState(null)

    const [searchParams, setSearchParams] = useSearchParams()
    const defaultFilter = bookService.getFilterFromSearchParams(searchParams)
    const [filterBy, setFilterBy] = useState(defaultFilter)

    useEffect(() => {
        setSearchParams(filterBy)
        loadBooks()
    }, [filterBy])

    function loadBooks() {
        bookService.query(filterBy)
            .then(books => setBooks(books))
            .catch(err => console.log('Found error! -> ', err))
    }


    function onSetFilter(filterBy) {
        setFilterBy({ ...filterBy })
    }

    function onRemoveBook(bookId, ref) {
        utilService.animateCSS(ref, 'fadeOut', false)
            .then(() => {
                bookService.remove(bookId)
                    .then(() => {
                        setBooks(books => books.filter(book => book.id !== bookId))
                        showSuccessMsg('Book deleted successfully!')
                    })
                    .catch(err => console.log(err))
            })

    }


    if (!books) return <h2>Loading..</h2>

    return (
        <section className="book-index">
            <BookAppHeader />
            <button className="btn-add book-btn"><Link to="/book/edit">Add Book</Link></button>
            <React.Fragment>
                <BookFilter filterBy={filterBy} onSetFilter={onSetFilter} />
                {!books.length && <h2>No books found</h2>}
                < BookList
                    books={books}
                    onRemoveBook={onRemoveBook}
                />
            </React.Fragment>
        </section>
    )
}

