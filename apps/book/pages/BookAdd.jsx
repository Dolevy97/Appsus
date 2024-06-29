
const { useNavigate } = ReactRouterDOM
const { useEffect, useState, useRef } = React

import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"
import { bookService } from "../services/book.service.js"
import { utilService } from '../../../services/util.service.js'
import { googleBookService } from "../services/google.book.service.js"



export function BookAdd() {

    const [googleBooks, setGoogleBooks] = useState()
    const [filter, setFilter] = useState({ title: '' })

    const debounceLoadBooks = useRef(utilService.debounce(loadBooks, 700))

    const navigate = useNavigate()

    useEffect(() => {
        debounceLoadBooks.current(filter)
    }, [filter])

    function loadBooks(filter) {
        googleBookService.query(filter)
            .then(books => {
                setGoogleBooks(books)
            })
            .catch(err => console.log('Found error! -> ', err))
    }

    function getBookById(bookId) {
        return googleBooks.find(book => book.id === bookId)
    }

    function addGoogleBook(ev, bookId) {
        ev.preventDefault()
        const book = getBookById(bookId)
        let newBook = {
            ...book, reviews: [], listPrice: {
                amount: utilService.getRandomIntInclusive(60, 200), currencyCode: 'NIS', isOnSale: Math.random() > 0.7
            }
        }
        bookService.addGoogleItem(newBook)
            .then(book => {
                navigate('/book')
                showSuccessMsg('Book saved successfully!')
            })
            .catch(err => {
                showErrorMsg('Book already exists!')
                console.log('err:', err)
            })
    }

    function handleTxtChange({ target }) {
        const { value } = target
        setFilter(prevFilter => ({ ...prevFilter, title: value }))
    }

    const { title } = filter

    return (
        <section className="google-books">
            <form>
                <label htmlFor="title"></label>
                <input onChange={handleTxtChange} value={title} type="text" placeholder="Search books" id="title" name="title" />
            </form>

            <section className="books-list">
                {googleBooks && googleBooks.map(book => <div onClick={() => addGoogleBook(event, `${book.id}`)} className="book-item" key={book.id}>
                    {book.thumbnail && <img className="book-cover-thumbnail" src={book.thumbnail} alt="Book thumbnail" />}
                    <h3>{book.title}</h3>
                    <button className="btn-google-add">+</button></div>)}
            </section>
        </section>
    )
}