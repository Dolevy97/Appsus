export function MailSortAndFilter({ mails, onSetFilterBy }) {


    return (
        <section className="sort-filter-container">
            <div className="filter-icons">
                <h4>Filter by:</h4>
                <div title="Unread Mails" onClick={() => { onSetFilterBy({ isRead: false }) }} className="material-symbols-outlined filter-icon">mark_email_unread</div>
                <div title="Read Mails" onClick={() => { onSetFilterBy({ isRead: true }) }} className="material-symbols-outlined filter-icon">mark_email_read</div>
            </div>
        </section>
    )
}