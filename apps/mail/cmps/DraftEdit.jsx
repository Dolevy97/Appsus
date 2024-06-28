const { useState, useEffect } = React
import { mailService } from "../services/mail.service.js";

export function DraftEdit({ onChangeFolder, onSetDraft, editId, setIsEditing, isEditing, onSetMail }) {
    const [draftToEdit, setDraftToEdit] = useState()

    useEffect(() => {
        if (isEditing) {
            mailService.get(editId).then(setDraftToEdit)
        }

    }, [isEditing])

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
        setDraftToEdit(prevMail => ({ ...prevMail, [field]: value }))
    }

    function onSaveDraft() {
        mailService.save(draftToEdit)
            .then(draft => {
                setDraftToEdit()
                setIsEditing(false)
                onSetDraft(draft)
            })
    }

    function onSaveAsMail(ev) {
        ev.preventDefault()
        delete draftToEdit.createdAt
        draftToEdit.sentAt = Math.floor(Date.now() / 1000)
        mailService.save(draftToEdit)
            .then(mail => {
                setDraftToEdit(null)
                setIsEditing(false)
                onSetDraft(mail)
                onChangeFolder({ status: 'sent' })
            })
    }

    if (!draftToEdit) return

    const { to, subject, body } = draftToEdit

    return (
        isEditing &&
        <section className="compose-mail">
            <form onSubmit={onSaveAsMail} className="compose-form-container">
                <article className="title-container">
                    <p className="input-title">New Message</p>
                    <span title="Save & Close" onClick={() => onSaveDraft()} className="material-symbols-outlined btn-close">close</span>
                </article>

                {/* <article className="from-container">
                    <p>From <span className="user-email">{`${user.email}`}</span></p>
                </article> */}

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
                    <span title="Discard draft" onClick={() => setIsAdding(false)} className="material-symbols-outlined discard-draft-icon">delete</span>
                </section>
            </form>
        </section>
    )
}