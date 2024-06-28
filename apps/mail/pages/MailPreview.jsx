import { mailService } from "../services/mail.service.js"

const { useNavigate } = ReactRouterDOM

export function MailPreview({ setEditId, setIsEditing, mail, getFormattedTime, onSetMail, onDeleteMail }) {
    const navigate = useNavigate()

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
            .then(onSetMail)
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

    return (
        <div onClick={() => `${mail.createdAt ? onEditDraft(mail.id) : onMoveToMail(mail.id)}`} className={`flex space-between mail-item ${mail.isRead ? 'read' : ''}`}>
            <section className="mail-start flex align-center">
                {!mail.removedAt && <div onClick={(onSetStar)}
                    className={`material-symbols-outlined mail-star ${isStar}`}>star</div>}
                <span className="mail-from">{mail.from}</span>
                <div className="separator"></div>
            </section>
            <section className="mail-content">
                <span className="mail-subject">{mail.subject}</span>
                <span className="mail-body"> - {mail.body}</span>
            </section>
            {mail.sentAt && <span className="mail-sent-at">{getFormattedTime(mail.sentAt)}</span>}
            {mail.createdAt && <span className="mail-sent-at">{getFormattedTime(mail.createdAt)}</span>}
            <div className="hover-icons">
                <span onClick={onDelMail} className="material-symbols-outlined hover-icon">delete</span>
                <span onClick={onUpdateRead} className="material-symbols-outlined hover-icon">{mail.isRead ? "mark_email_unread" : "mark_email_read"}</span>
            </div>
        </div>
    )
}
