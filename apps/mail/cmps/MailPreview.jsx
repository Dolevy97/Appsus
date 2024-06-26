import { mailService } from "../services/mail.service.js"
const { useNavigate } = ReactRouterDOM
const { useState } = React

export function MailPreview({ mail, getFormattedTime }) {
    const [isStarred, setIsStarred] = useState(mail.isStarred)
    const [isRead, setIsRead] = useState(mail.isRead)
    const navigate = useNavigate()

    function moveToMail(mailId) {
        navigate(`/mail/${mailId}`)
        if (!isRead) {
            const newMail = { ...mail, isRead: !isRead }
            mailService.save(newMail)
                .then(setIsRead(true))
                .catch(err => console.log('Oh no! err:', err))
        }
    }

    function onSetStar(ev) {
        ev.stopPropagation()
        const newMail = { ...mail, isStarred: !isStarred }

        mailService.save(newMail)
            .then(setIsStarred(!isStarred))
            .catch(err => console.log('Oh no! err:', err))
    }


    const isStar = isStarred ? 'star' : '';
    return (
        <React.Fragment>
            <section onClick={(ev) => {
                ev.stopPropagation()
                moveToMail(mail.id)
            }} className="mail-start flex align-center">
                <div onClick={(onSetStar)}
                    className={`material-symbols-outlined mail-star ${isStar}`}>star</div>
                <span className="mail-from">{mail.from}</span>
            </section>
            <section onClick={() => moveToMail(mail.id)} className="mail-content">
                <span className="mail-subject">{mail.subject}</span>
                <span className="mail-body"> - {mail.body}</span>
            </section>
            <span className="mail-sent-at">{getFormattedTime(mail.sentAt)}</span>
        </React.Fragment>
    )
}
