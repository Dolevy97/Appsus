const { useState, useEffect, useRef } = React;

import { utilService } from "../../../services/util.service.js"
import { MailHeader } from "../cmps/MailHeader.jsx"
import { MailList } from "../cmps/MailList.jsx"
import { MailSortAndFilter } from "../cmps/MailSortAndFilter.jsx"
import { mailService } from "../services/mail.service.js"

export function MailIndex() {
    const [mails, setMails] = useState(null)
    const [filterBy, setFilterBy] = useState(mailService.getDefaultFilter())
    const [sortBy, setSortBy] = useState()
    const debounceLoadBooks = useRef(utilService.debounce(loadMails, 300))

    useEffect(() => {
        debounceLoadBooks.current(filterBy, sortBy)
        // console.log(sortBy)
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

            <MailSortAndFilter
                mails={mails}
                onSetFilterBy={onSetFilterBy}
                onSetSortBy={onSetSortBy}
            />

            <section className="mail-folder-list">
                <span className="material-symbols-outlined active">inbox</span>
                <span className="material-symbols-outlined">star</span>
                <span className="material-symbols-outlined">send</span>
                <span className="material-symbols-outlined">draft</span>

            </section>

            <MailList
                mails={mails}
                setMails={setMails}
            />
        </section>
    )
}

