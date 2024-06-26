const { useState, useEffect, useRef } = React;

import { utilService } from "../../../services/util.service.js";
import { MailHeader } from "../cmps/MailHeader.jsx";
import { MailList } from "../cmps/MailList.jsx";
import { mailService } from "../services/mail.service.js"

export function MailIndex() {
    const [mails, setMails] = useState(null)
    const [filterBy, setFilterBy] = useState({ txt: '' })
    const debounceLoadBooks = useRef(utilService.debounce(loadMails, 300))

    useEffect(() => {
        debounceLoadBooks.current(filterBy)
    }, [filterBy])

    function loadMails(filterBy) {
        mailService.query(filterBy)
            .then(mails => {
                setMails(mails)
            })
    }

    if (!mails) return <h2>Loading..</h2>
    return (
        <section className="mail-index">
            <MailHeader setFilterBy={setFilterBy} />
            <MailList
                mails={mails}
                setMails={setMails}
            />
        </section>
    )
}

