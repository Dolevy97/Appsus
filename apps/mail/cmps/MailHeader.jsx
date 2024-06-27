const { useState, useEffect } = React
import { mailService } from "../services/mail.service.js";
import { MailCompose } from "./MailCompose.jsx";
import { MailFilter } from "./MailFilter.jsx";



export function MailHeader({ setFilterBy, setMails, mails }) {
    const [isAdding, setIsAdding] = useState(false)



    function onSetMail(updatedMail) {
        const updatedMails = [...mails, updatedMail]
        setMails(updatedMails)
    }

    return (
        <header className="mail-header">

            <section className="logo-container">
                <img className="logo" src="../assets/imgs/gmail.png" alt="" />
            </section>
            <MailFilter setFilterBy={setFilterBy} />
            <MailCompose
                setIsAdding={setIsAdding}
                isAdding={isAdding}
                onSetMail={onSetMail}
            />
        </header>
    )
}