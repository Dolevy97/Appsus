import { mailService } from "../services/mail.service.js"

const { Link, NavLink, useNavigate } = ReactRouterDOM
const { useState, useEffect } = React

export function MailPreview({ mail, getFormattedTime }) {
    const [isStarred, setIsStarred] = useState(mail.isStarred)
    const [isRemovedAt, setIsRemovedAt] = useState(mail.removedAt)
    const [isRead, setIsRead] = useState(mail.isRead)
    const navigate = useNavigate()

    function onSetStar(ev) {
        ev.stopPropagation()
        const newMail = { ...mail, isStarred: !isStarred }
        mailService.save(newMail)
            .then(setIsStarred(!isStarred))
            .catch(err => console.log('Oh no! err:', err))
    }

    function onDeleteMail(ev) {
        ev.stopPropagation()
        const now = Math.floor(Date.now() / 1000)
        const newMail = { ...mail, removedAt: now }
        mailService.save(newMail)
            .then(() => setIsRemovedAt(now))
            .catch(err => console.log('Oh no! err:', err))
    }

    function onUpdateRead(ev) {
        ev.stopPropagation()
        const newMail = { ...mail, isRead: !isRead }
        mailService.save(newMail)
            .then(setIsRead(!isRead))
            .catch(err => console.log('Oh no! err:', err))
    }


    function moveToMail(mailId) {
        navigate(`/mail/${mailId}`)
        mailService.get(mailId)
            .then(mail => {
                if (!mail.isRead) {
                    const newMail = { ...mail, isRead: true }
                    mailService.save(newMail)
                        .then()
                        .catch(err => console.log('Oh no! err:', err))
                }
            })
    }


    if (isRemovedAt !== null) {
        return null;
    }

    const isStar = isStarred ? 'star' : ''
    return (
        <div onClick={() => moveToMail(mail.id)} className={`flex space-between mail-item ${mail.isRead ? 'read' : ''}`}>
            <section className="mail-start flex align-center">
                <div onClick={(onSetStar)}
                    className={`material-symbols-outlined mail-star ${isStar}`}>star</div>
                <span className="mail-from">{mail.from}</span>
            </section>
            <section className="mail-content">
                <span className="mail-subject">{mail.subject}</span>
                <span className="mail-body"> - {mail.body}</span>
            </section>
            <span className="mail-sent-at">{getFormattedTime(mail.sentAt)}</span>
            <div className="hover-icons">
                <span onClick={onDeleteMail} className="material-symbols-outlined hover-icon">delete</span>
                <span onClick={onUpdateRead} className="material-symbols-outlined hover-icon">{isRead ? "mark_email_unread" : "mark_email_read"}</span>
            </div>
        </div>
    )
}
