const { useState, useEffect } = React

export function BookFilter({ filterBy, onSetFilter }) {
    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })

    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value
                break;

            case 'checkbox':
                value = target.checked
                break;

            case 'radio':
                value = target.id
                break;
            default:
                break;
        }
        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    function clearFilter() {
        setFilterByToEdit(bookService.getDefaultFilter())
    }

    const { title, price, year, bookLength } = filterByToEdit

    return (
        <section className="book-filter">
            <form>
                <h2>Filter Books</h2>
                <label htmlFor="title">Title</label>
                <input value={title} onChange={handleChange} name="title" type="text" id="title" />

                <label htmlFor="price">Price</label>
                <input value={price || ''} onChange={handleChange} name="price" type="number" id="price" />

                <section className="radio-year">
                    <label htmlFor="vintage">Vintage</label>
                    <input checked={year === 'vintage'} onChange={handleChange} type="radio" name="year" id="vintage" />
                    <label htmlFor="new">New</label>
                    <input checked={year === 'new'} onChange={handleChange} type="radio" name="year" id="new" />
                </section>

                <label htmlFor="book-length">Book has atleast {bookLength} pages</label>
                <input value={bookLength || 0} onChange={handleChange} name="bookLength" min={0} max={800} type="range" id="book-length" />

                <button onClick={clearFilter}>Clear Filter</button>
            </form>
        </section>
    )
}