const { useEffect, useState } = React
import { BookAppHeader } from '../cmps/BookAppHeader.jsx'
import { Chart } from '../cmps/Chart.jsx'
import { bookService } from '../services/book.service.js'

export function Dashboard() {

    const [books, setBooks] = useState([])
    const [priceStats, setPriceStats] = useState([])
    const [categoryStats, setCategoryStats] = useState([])

    useEffect(() => {
        bookService.query()
            .then(setBooks)
        bookService.getCategoryStats()
            .then(setCategoryStats)
        bookService.getPriceStats()
            .then(setPriceStats)
    }, [])


    return (
        <section className="dashboard">
            <BookAppHeader />
            <h1>Dashboard</h1>
            <h2>Statistics for {books.length} Books</h2>
            <h4>By Genre</h4>
            <Chart data={categoryStats} />
            <hr />
            <h4>By Price</h4>
            <Chart data={priceStats} />
        </section>
    )
}