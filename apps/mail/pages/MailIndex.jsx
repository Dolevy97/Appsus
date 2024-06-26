const { useState, useEffect, useRef } = React;

import { MailHeader } from "../cmps/MailHeader.jsx";
import { MailList } from "../cmps/MailList.jsx";
import { mailService } from "../services/mail.service.js"

export function MailIndex() {
    const [mails, setMails] = useState(null)

    useEffect(() => {
        mailService.query()
            .then(mails => {
                setMails(mails)
            })
    }, [])


    if (!mails) return <h2>Loading..</h2>
    return (
        <section className="mail-index">
            <MailHeader />
            <MailList
                mails={mails}
            />
        </section>
    )
}

