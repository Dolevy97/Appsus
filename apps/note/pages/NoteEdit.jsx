

import { noteService } from "../services/note.service.js"
import { eventBusService } from '../../../services/event-bus.service.js'


const { Link } = ReactRouterDOM

export function NoteEdit(){







    return(
        <section className="edit-note">
        <div className="main-screen"></div>
        <div className="edit-note-container">
          <h1>Test</h1>
          <br />
          <h2><Link to="/note">X</Link></h2>
        </div>
      </section>
    )
}