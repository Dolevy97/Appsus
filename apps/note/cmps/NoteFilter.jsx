

export function NoteFilter() {





    return (
        <section className="note-filter-container">
            <label htmlFor="byText"></label>
            <input
                type="text"
                id="byText"
                name="text"
                className="input note-filter-input"
                placeholder="Search by text"
            />
        </section>
    );
}