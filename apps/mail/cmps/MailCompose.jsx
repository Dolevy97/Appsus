const { useState, useEffect } = React
import { mailService } from "../services/mail.service.js";
import { noteService } from "../../note/services/note.service.js";
const { useNavigate, useSearchParams } = ReactRouterDOM

export function MailCompose({ setIsAdding, isAdding, onSetMail }) {
    const [searchParams, setSearchParams] = useSearchParams()

    const defaultMail = mailService.getMailFromSearchParams(searchParams)

    const [user, setUser] = useState(null)
    const [newMail, setNewMail] = useState(defaultMail)

    const navigate = useNavigate()

    useEffect(() => {
        mailService.getUser()
            .then(setUser)
    }, [])

    useEffect(() => {
        if (searchParams.size > 0) {
            setIsAdding(true)
        }
    }, [searchParams])

    useEffect(() => {
        setSearchParams(newMail)
    }, [newMail])

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
        mailService.getUser()
            .then(user => {
                newMail.from = user.email
                newMail.createdAt = Math.floor(Date.now() / 1000)
                mailService.save(newMail)
                    .then(mail => {
                        setNewMail(mailService.getEmptyMail())
                        setIsAdding(false)
                        onSetMail(mail)
                    })
            })
    }

    function onSendToNote() {
        const newNote = noteService.getEmptyNote()
        const formattedMailToNote = newMail.body
        newNote.info.txt = formattedMailToNote
        noteService.save(newNote)
            .then(() => {
                navigate('/note')
            })
    }


    if (!newMail || !user) return

    const { body, subject, to } = newMail

    return (
        isAdding &&
        <section className="compose-mail">
            <form onSubmit={onAddMail} className="compose-form-container">
                <article className="title-container">
                    <p className="input-title">New Message</p>
                    <span title="Save & Close" onClick={() => onSaveDraft()} className="material-symbols-outlined btn-close">close</span>
                </article>

                <article className="from-container">
                    <p>From <span className="user-email">{`${user.email}`}</span></p>
                </article>

                <article className="input-to">
                    <label htmlFor="mail-to"></label>
                    <input value={to} onChange={handleChange} required id="mail-to" type="email" name="to" placeholder="To" />
                </article>

                <article className="input-subject">
                    <label htmlFor="subject"></label>
                    <input value={subject} onChange={handleChange} id="subject" type="text" name="subject" placeholder="Subject" />
                </article>

                <textarea value={body} onChange={handleChange} className="input-textarea" name="body" id="body">
                </textarea>

                <section className="compose-footer">

                    <button className="btn-send">Send</button>
                    <button className="mobile-btn-send"><span className="material-symbols-outlined">send</span></button>
                    <div onClick={onSendToNote} title="Send to keep" className="send-to-keep">
                        <span className="material-symbols-outlined">note_stack</span>
                    </div>
                    <span title="Discard draft" onClick={() => setIsAdding(false)} className="material-symbols-outlined discard-draft-icon">delete</span>
                </section>
            </form>
        </section>
    )
}