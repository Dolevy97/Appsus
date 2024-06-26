

const { useState, useEffect } = React

export function NoteFilter({ onSetFilter, filterBy }) {

    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

    useEffect(() => {
        onSetFilter(filterByToEdit)
      }, [filterByToEdit])
    


      function handleChange(ev) {
        const field = ev.target.name
        const value =
          ev.target.type === "number" ? +ev.target.value : ev.target.value
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
      }
    
      function onFilter(ev) {
        ev.preventDefault()
        onSetFilter(filterByToEdit)
      }

      const {text} = filterByToEdit


    return (
        <section className="note-filter-container">
            <label htmlFor="byText"></label>
            <input
                type="text"
                id="byText"
                name="text"
                value={text}
                onChange={handleChange}
                className="input note-filter-input"
                placeholder="Search by text"
            />
        </section>
    );
}