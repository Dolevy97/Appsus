const { useState, useEffect } = React
import { mailService } from "../services/mail.service.js";

export function MailCompose({ setIsAdding, isAdding, onSetMail }) {
    const [user, setUser] = useState(null)
    const [newMail, setNewMail] = useState(mailService.getEmptyMail())

    useEffect(() => {
        mailService.getUser()
            .then(setUser)
    }, [])

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value
                break;

            case 'checkbox':
                value = target.checked
                break;

            case 'radio':
                value = target.id
                break;
            default:
                break;
        }
        setNewMail(prevMail => ({ ...prevMail, [field]: value }))
    }

    function onAddMail(ev) {
        ev.preventDefault()
        const mailToAdd = { ...newMail, from: user.email, sentAt: Math.floor(Date.now() / 1000) }
        if (mailToAdd.subject === '' || mailToAdd.body === '') {
            const verifySend = confirm('Send this message without a subject or text in the body?')
            if (verifySend) {
                mailService.save(mailToAdd)
                    .then(mail => {
                        setNewMail(mailService.getEmptyMail())
                        setIsAdding(false)
                        onSetMail(mail)
                    })
            }
        } else {
            mailService.save(mailToAdd)
                .then(mail => {
                    setNewMail(mailService.getEmptyMail())
                    setIsAdding(false)
                    onSetMail(mail)
                })
        }
    }

    function onSaveDraft() {
        console.log(newMail)
        // setIsAdding(false) //Close new mail
    }

    return (
        isAdding &&
        <section className="compose-mail">
            <form onSubmit={onAddMail} className="compose-form-container">
                <article className="title-container">
                    <p className="input-title">New Message</p>
                    <span onClick={() => onSaveDraft()} className="material-symbols-outlined btn-close">close</span>
                </article>

                <article className="from-container">
                    <p>From <span className="user-email">{`${user.email}`}</span></p>
                </article>

                <article className="input-to">
                    <label htmlFor="mail-to"></label>
                    <input onChange={handleChange} required id="mail-to" type="email" name="to" placeholder="To" />
                </article>

                <article className="input-subject">
                    <label htmlFor="subject"></label>
                    <input onChange={handleChange} id="subject" type="text" name="subject" placeholder="Subject" />
                </article>

                <textarea onChange={handleChange} className="input-textarea" name="body" id="body">
                </textarea>

                <section className="compose-footer">
                    <button className="btn-send">Send</button>
                    <span onClick={() => setIsAdding(false)} className="material-symbols-outlined discard-draft-icon">delete</span>
                </section>
            </form>
        </section>
    )
}