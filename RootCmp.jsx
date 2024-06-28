const { Route, Routes } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter

import { AppHeader } from "./cmps/AppHeader.jsx"
import { About } from "./pages/About.jsx"
import { Home } from "./pages/Home.jsx"
import { MailIndex } from "./apps/mail/pages/MailIndex.jsx"
import { NoteIndex } from "./apps/note/pages/NoteIndex.jsx"
import { MailDetails } from "./apps/mail/pages/MailDetails.jsx"
import { NoteEdit } from "./apps/note/pages/NoteEdit.jsx"

// Books
import { BookIndex } from "./apps/book/pages/BookIndex.jsx"
import { BookDetails } from "./apps/book/pages/BookDetails.jsx"
import { BookEdit } from "./apps/book/pages/BookEdit.jsx"
import { NotFound } from "./apps/book/cmps/NotFound.jsx"
import { UserMsg } from "./apps/book/cmps/UserMsg.jsx"
import { BookAdd } from "./apps/book/pages/BookAdd.jsx"
import { Dashboard } from "./apps/book/pages/Dashboard.jsx"


export function App() {
    return <Router>
        <section className="app">
            <AppHeader />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/mail" element={<MailIndex />} />
                <Route path="/mail/:mailId" element={<MailDetails />} />
                <Route path="/note" element={<NoteIndex />} >
                    <Route path="/note/:noteId" element={<NoteEdit />} />
                </Route>
                <Route path="/book" element={<BookIndex />} />
                <Route path="/book/edit/:bookId" element={<BookEdit />} />
                <Route path="/book/:bookId" element={<BookDetails />} />
                <Route path="/add" element={<BookAdd />} />
                <Route path="/book/edit" element={<BookEdit />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="*" element={<NotFound />} />
            </Routes>

            <UserMsg />
        </section>
    </Router>
}
