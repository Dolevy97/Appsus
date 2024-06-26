import { mailService } from "../services/mail.service.js"

const { useParams, Link} = ReactRouterDOM
const { useEffect, useState, useRef } = React

export function MailDetails() {
    const { mailId } = useParams()
    const [mail, setMail] = useState(null)

    useEffect(() => {
        mailService.get(mailId)
            .then(setMail)
    }, [])

    function getFormattedTime(time) {
        const date = new Date(time * 1000)
        const today = Math.floor(Date.now() / 1000)
        const day = 60 * 60 * 24
        const currYear = new Date().getFullYear()
        const diff = today - time // The diff between today and the time of the mail
        return new Intl.DateTimeFormat('en-US', {
            dateStyle: 'medium',
            timeStyle: 'short',
        }).format(date)
    }

    if (!mail) return <h2>Loading..</h2>

    return (
        <section className="mail-details-container">
            <Link to="/mail"><button className="btn-back">
                <span className="material-symbols-outlined">arrow_back</span>
            </button></Link>
            <section className="mail-details-header">
                <div className="header-left">
                    <h3 className="mail-details-subject">{mail.subject}</h3>
                    <p className="mail-details-from">{mail.from}</p>
                    <p className="mail-details-to">to me</p>
                </div>
                <div className="header-right">
                    {getFormattedTime(`${mail.sentAt}`)}
                </div>
            </section>
            {mail.body}
        </section >
    )
}

