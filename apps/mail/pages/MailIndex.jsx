const { useState, useEffect, useRef } = React;

import { utilService } from "../../../services/util.service.js"
import { MailFolderList } from "../cmps/MailFolderList.jsx";
import { MailHeader } from "../cmps/MailHeader.jsx"
import { MailList } from "../cmps/MailList.jsx"
import { MailSorting } from "../cmps/MailSorting.jsx"
import { mailService } from "../services/mail.service.js"

export function MailIndex() {
    const [mails, setMails] = useState(null)
    const [filterBy, setFilterBy] = useState({ status: 'inbox' })
    const [sortBy, setSortBy] = useState()
    const debounceLoadBooks = useRef(utilService.debounce(loadMails, 300))


    useEffect(() => {
        debounceLoadBooks.current(filterBy, sortBy)
    }, [filterBy, sortBy])

    function loadMails(filterBy, sortBy) {
        mailService.query(filterBy, sortBy)
            .then(mails => {
                setMails(mails)
            })
    }

    function onSetFilterBy(filter) {
        setFilterBy(prevFilter => ({ ...prevFilter, ...filter }))
    }

    function onSetSortBy(sort) {
        setSortBy(sort)
    }

    if (!mails) return <div className="loader-container"> <div className="loader"></div></div>
    return (
        <section className="mail-index">
            <MailHeader
                mails={mails}
                setMails={setMails}
                setFilterBy={setFilterBy}
            />

            <MailSorting
                mails={mails}
                onSetFilterBy={onSetFilterBy}
                onSetSortBy={onSetSortBy}
            />
            <MailFolderList
                onSetFilterBy={onSetFilterBy}
            />
            <MailList
                mails={mails}
                setMails={setMails}
            />
        </section>
    )
}

