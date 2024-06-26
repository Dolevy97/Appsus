const { useState, useEffect, useRef } = React;

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
            <img className="logo" src="https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_default_1x_r5.png" alt="" />
            <MailList 
            mails={mails}
            />
        </section>
    )
}

