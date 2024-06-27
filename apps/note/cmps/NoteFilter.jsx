

const { useState, useEffect } = React

export function NoteFilter({ onSetFilter, filterBy }) {

  const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

  const filters = [
    { display: 'Text', filter: 'NoteTxt' },
    { display: 'Image', filter: 'NoteImg' },
    { display: 'Todo', filter: 'NoteTodos' },
    { display: 'Video', filter: 'NoteVideo' },
  ]

  useEffect(() => {
    onSetFilter(filterByToEdit)
  }, [filterByToEdit])



  function onFilterClick(filterType) {
    filterBy.type === filterType
      ? onSetFilter({ type: '' })
      : onSetFilter({ type: filterType })
  }


  function handleChange(ev) {
    const field = ev.target.name
    const value =
      ev.target.type === "number" ? +ev.target.value : ev.target.value
    setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
  }


  const { text } = filterByToEdit

  return (

    <section className="note-filter-section" >
      <div className="note-filter-container">
        <div className="search-icon-note">
          <span className="material-symbols-outlined">search</span>
        </div>
        <div className="filter-icon">
          <span className="material-symbols-outlined">  filter_alt </span>
          <div className="note-filter-type">
          {filters.map((filterItem) => {
            return (
              <p
                className={filterBy.type === filterItem.filter ? 'active' : ''}
                key={filterItem.display}
                onClick={() => onFilterClick(filterItem.filter)}
              >
                {filterItem.display}
              </p>
            )
          })}
        </div>
        </div>
        <div className="filter-input-container">
          <input
            type="text"
            id="byText"
            name="text"
            value={text} onChange={handleChange} className="input note-filter-input" placeholder="Search"
          />
        </div>
       
      </div>
    </section>
  );
}