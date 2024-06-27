const { useState } = React;

export function MailSortAndFilter({ mails, onSetFilterBy, onSetSortBy }) {

    const [sortDirection, setSortDirection] = useState(1)

    function toggleSortDirection() {
        setSortDirection(sortDirection === 1 ? -1 : 1)
    }

    return (
        <section className="sort-filter-container">
            <div className="filter-icons">
                <h4>Filter by:</h4>
                <div title="Unread Mails" onClick={() => { onSetFilterBy({ isRead: false }) }} className="material-symbols-outlined filter-icon">mark_email_unread</div>
                <div title="Read Mails" onClick={() => { onSetFilterBy({ isRead: true }) }} className="material-symbols-outlined filter-icon">mark_email_read</div>
            </div>

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