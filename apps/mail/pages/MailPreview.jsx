const { useEffect, useState } = React
import { showGmailMsg } from "../../../services/event-bus.service.js"
import { mailService } from "../services/mail.service.js"

const { useNavigate } = ReactRouterDOM

export function MailPreview({ setEditId, setIsEditing, mail, getFormattedTime, onSetMail, onDeleteMail }) {
    const navigate = useNavigate()
    const [user, setUser] = useState()



    useEffect(() => {
        mailService.getUser().then(setUser)
    }, [])

    function onSetStar(ev) {
        ev.stopPropagation()
        const newMail = { ...mail, isStarred: !mail.isStarred }
        mailService.save(newMail)
            .then(onSetMail)
            .catch(err => console.log('Oh no! err:', err))
    }

    function onUpdateRead(ev) {
        ev.stopPropagation()
        const newMail = { ...mail, isRead: !mail.isRead }
        mailService.save(newMail)
            .then(mail => {
                onSetMail(mail)
                showGmailMsg(`Conversation marked as ${mail.isRead ? 'read' : 'unread'}`)
            })
            .catch(err => console.log('Oh no! err:', err))
    }

    function onDelMail(ev) {
        ev.stopPropagation()
        if (mail.removedAt !== null) {
            mailService.remove(mail.id)
                .then(onDeleteMail(mail.id, true))
                .catch(err => console.log('Oh no! err:', err))
        } else {
            const now = Math.floor(Date.now() / 1000)
            const newMail = { ...mail, removedAt: now }
            mailService.save(newMail)
                .then(onDeleteMail)
                .catch(err => console.log('Oh no! err:', err))
        }
    }

    function onMoveToMail(mailId) {
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

    function onEditDraft(draftId) {
        setIsEditing(prevIsEditing => !prevIsEditing)
        setEditId(draftId)
    }

    const isStar = mail.isStarred ? 'star' : ''
    if (!user) return
    return (
        <div onClick={() => `${mail.createdAt ? onEditDraft(mail.id) : onMoveToMail(mail.id)}`} className={`flex space-between mail-item ${mail.isRead ? 'read' : ''}`}>
            <section className="mail-start flex align-center">
                {!mail.removedAt && <div title="Set As Starred" onClick={(onSetStar)}
                    className={`material-symbols-outlined mail-star ${isStar}`}>star</div>}
                {user.email === mail.to && <span title="Sent From" className="mail-from">{mail.from}</span>}
                {user.email === mail.from && <span title="Sent To" className="mail-from">To: {mail.to}</span>}
                <div className="separator"></div>
            </section>
            <section className="mail-content">
                <span title="Mail Subject" className="mail-subject">{mail.subject}</span>
                <span title="Mail Body" className="mail-body"> - {mail.body}</span>
            </section>
            {/* {mail.sentAt && <span title="Sent At" className="mail-sent-at">{getFormattedTime(mail.sentAt)}</span>} */}
            {mail.createdAt && <span title="Created At" className="mail-sent-at">{getFormattedTime(mail.createdAt)}</span>}
            <div className="hover-icons">
                <span title="Delete Mail" onClick={onDelMail} className="material-symbols-outlined hover-icon">delete</span>
                <span title={mail.isRead ? "Mark As Unread" : "Mark As Read"} onClick={onUpdateRead} className="material-symbols-outlined hover-icon">{mail.isRead ? "mark_email_unread" : "mark_email_read"}</span>
            </div>
        </div>
    )
}
