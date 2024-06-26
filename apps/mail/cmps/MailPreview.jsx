import { mailService } from "../services/mail.service.js"

const { useState } = React

export function MailPreview({ mail, getFormattedTime }) {
    const [isStarred, setIsStarred] = useState(mail.isStarred)

    function onSetStar(mail) {
        const newStarred = !isStarred
        const newMail = { ...mail, isStarred: newStarred }
        mailService.save(newMail)
            .then(setIsStarred(newStarred))
            .catch(err => console.log('Oh no! err:', err))
    }


    const isStar = isStarred ? 'star' : '';
    return (
        <React.Fragment>
            <section className="mail-start flex align-center">
                <span onClick={() => { onSetStar(mail) }} className={`material-symbols-outlined mail-star ${isStar}`}>star</span>
                <span className="mail-from">{mail.from}</span>
            </section>
            <section className="mail-content">
                <span className="mail-subject">{mail.subject}</span>
                <span className="mail-body"> - {mail.body}</span>
            </section>
            <span className="mail-sent-at">{getFormattedTime(mail.sentAt)}</span>
        </React.Fragment>
    )
}
