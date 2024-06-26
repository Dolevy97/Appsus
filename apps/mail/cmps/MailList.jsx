import { mailService } from "../services/mail.service.js"
import { MailPreview } from "./MailPreview.jsx"

const { useState, useEffect } = React

export function MailList({ mails }) {

    function getFormattedTime(time) {
        const date = new Date(time * 1000)
        const today = Math.floor(Date.now() / 1000)
        const day = 60 * 60 * 24
        const currYear = new Date().getFullYear()
        const diff = today - time // The diff between today and the time of the mail
        if (diff < day) return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
        else if (date.getFullYear() === currYear) return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(date)
        else return new Intl.DateTimeFormat('en-US').format(date)
    }

    // const filteredMails = mails.filter(mail => mail.removedAt === null);

    return (
        <section className="mails-container">
            {mails.map(mail =>
                <MailPreview mail={mail} getFormattedTime={getFormattedTime} key={mail.id} />

            )}
        </section >
    )
}
