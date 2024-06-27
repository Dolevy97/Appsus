const { useState } = React;

export function MailSorting({ mails, onSetSortBy }) {

    const [sortDirection, setSortDirection] = useState(1)

    function toggleSortDirection() {
        setSortDirection(sortDirection === 1 ? -1 : 1)
    }

    return (
        <section className="sort-filter-container">

            <div className="sort-icons">
                <h4>Sort by:</h4>
                <span onClick={() => {
                    onSetSortBy({ subject: sortDirection })
                    toggleSortDirection()
                }} className="material-symbols-outlined sort-icon">subject</span>
                <span onClick={() => {
                    onSetSortBy({ date: sortDirection })
                    toggleSortDirection()
                }} className="material-symbols-outlined sort-icon">calendar_month</span>
            </div>
        </section>
    )
}