const { useParams, Link, Outlet } = ReactRouterDOM
import { bookService } from "../services/book.service.js"
import { utilService } from '../../../services/util.service.js'
import { LongTxt } from "../cmps/LongTxt.jsx"
import { AddReview } from "../cmps/AddReview.jsx"
import { ReviewList } from "../cmps/reviewList.jsx"

const { useEffect, useState, useRef } = React

export function BookDetails() {

    const [book, setBook] = useState(null)
    const [isAddingReview, setIsAddingReview] = useState(false)
    const [books, setBooks] = useState(null)

    const { bookId } = useParams()
    const reviewRef = useRef({})

    useEffect(() => {
        bookService.get(bookId)
            .then(book => {
                setBook(book)
            })
    }, [books, bookId])

    useEffect(() => {
        bookService.query()
            .then(setBooks)
    }, [])

    function getReadingLength() {
        var readingLength
        if (book.pageCount > 500) readingLength = 'Serious Reading'
        else if (book.pageCount > 200) readingLength = 'Decent Reading'
        else readingLength = 'Light Reading'
        return readingLength
    }

    function getPublishedDate() {
        const currYear = new Date().getFullYear()
        const diff = currYear - book.publishedDate
        if (diff > 10) return 'Vintage'
        else return 'New'
    }

    function getPriceClass() {
        if (book.listPrice.amount > 150) return 'red-text'
        else if (book.listPrice.amount < 150) return 'green-text'
        else return ''
    }

    function filterByWord({ target }) {
        const filter = target.innerText
        console.log(filter)
    }

    function onAddReview(ev, review) {
        ev.preventDefault()
        bookService.addReview(bookId, review)
            .then(book => {
                setBook(book)
                setIsAddingReview(false)
            })
    }

    function onDeleteReview(reviewId, ref) {
        utilService.animateCSS(ref, 'bounceOut', false)
            .then(() => {
                bookService.deleteReview(book, reviewId)
                    .then(prevBook => {
                        setBook({ ...prevBook })
                    })
            })
    }

    function onSetAddReview({ target }) {
        setIsAddingReview(prevIsAddingReview => !prevIsAddingReview)
    }

    if (!book) return <div>Loading...</div>
    if (!books) return

    const currBookIdx = books.findIndex(book => book.id === bookId)
    const prevBookId = currBookIdx > 0 ? books[currBookIdx - 1].id : null;
    const nextBookId = (currBookIdx < books.length - 1) ? books[currBookIdx + 1].id : null;

    return (
        <React.Fragment>
            <div className="page-btns">
                <Link to="/book"><button className="btn-back">Back</button></Link>
                {prevBookId && <Link to={`/book/${prevBookId}`}><button>Previous Book</button></Link>}
                {nextBookId && <Link to={`/book/${nextBookId}`}><button>Next Book</button></Link>}
            </div>

            <section className="book-details">

                <img className="book-details-image" src={book.thumbnail} alt="" />
                {book.thumbnail && book.listPrice.isOnSale && <img className="sale" src="./assets/img/saletag.png" alt="" />}
                {!book.thumbnail && book.listPrice.isOnSale && <h1>This book is on sale!</h1>}

                <h2>{book.title}</h2>
                <h3>{book.subtitle}</h3>
                <h4>-By {`${book.authors.join(' ')}`}</h4>

                <LongTxt txt={book.description} />

                <h3>{getReadingLength()} ({book.pageCount} pages), {getPublishedDate()} ({book.publishedDate}) </h3>
                <h3>Genres: {book.categories.map((genre, idx) => {
                    return <React.Fragment key={utilService.makeId()}>
                        {idx > 0 && ' '}
                        <span onClick={filterByWord} className='genre'>{genre}</span>
                    </React.Fragment>
                })}</h3>
                <h2 className={getPriceClass()}>{book.listPrice.amount} {book.listPrice.currencyCode}</h2>
                <button>Buy Now!</button>
            </section>

            <section className="add-review">
                <button onClick={onSetAddReview}>{isAddingReview ? 'Close Review' : 'Add Review'}</button>
                {isAddingReview && <AddReview onAddReview={onAddReview} />}
            </section>

            <ReviewList reviews={book.reviews} onDeleteReview={onDeleteReview} />

        </React.Fragment>
    )
}