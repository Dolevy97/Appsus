export function MailFilter({ setFilterBy }) {

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
        setFilterBy(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    return (
        <section className="filter-container">
            <div className="search-icon">
                <span className="material-symbols-outlined">search</span>
            </div>

            <div className="filter-input-container">
                <input onChange={handleChange} className="filter-input" type="text" placeholder="Search mail" name="txt" />
            </div>
            <div className="filter-searchbar-icon">
                <span className="material-symbols-outlined">tune</span>
                <div className="filter-icons">
                    <div title="Unread Mails" onClick={() => { setFilterBy({ isRead: false }) }} className="material-symbols-outlined filter-icon">mark_email_unread</div>
                    <div title="Read Mails" onClick={() => { setFilterBy({ isRead: true }) }} className="material-symbols-outlined filter-icon">mark_email_read</div>
                </div>
            </div>

        </section>
    )
}

