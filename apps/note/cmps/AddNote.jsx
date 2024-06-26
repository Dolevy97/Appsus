


import { eventBusService } from '../../../services/event-bus.service.js'
import { noteService } from "../services/note.service.js"

export function AddNote(){






return(
    <section className="add-note-container">
    <label htmlFor="byText"></label>
    <input
        type="text"
        id="byText"
        name="text"
        className="input add-note-input"
        placeholder="Search by text"
    />
</section>
)

}