const { useState, useEffect, useRef } = React;

import { utilService } from "../../../services/util.service.js"
import { MailHeader } from "../cmps/MailHeader.jsx"
import { MailList } from "../cmps/MailList.jsx"
import { MailSortAndFilter } from "../cmps/MailSortAndFilter.jsx"
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

    function onSetFilterBy(filter) {
        setFilterBy(prevFilter => ({ ...prevFilter, ...filter }))
    }

    if (!mails) return <div className="loader-container"> <div className="loader"></div></div>
    return (
        <section className="mail-index">
            <MailHeader
                mails={mails}
                setMails={setMails}
                setFilterBy={setFilterBy}
            />

            <MailSortAndFilter
                mails={mails}
                onSetFilterBy={onSetFilterBy}
            />

            <MailList
                mails={mails}
                setMails={setMails}
            />
        </section>
    )
}

