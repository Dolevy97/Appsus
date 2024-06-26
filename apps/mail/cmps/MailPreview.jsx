import { mailService } from "../services/mail.service.js"

const { useState } = React

export function MailPreview({ mail, getFormattedTime }) {
    const [isStarred, setIsStarred] = useState(mail.isStarred)

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
                <span className="material-symbols-outlined">delete</span>
            </div>
        </React.Fragment>
    )
}
