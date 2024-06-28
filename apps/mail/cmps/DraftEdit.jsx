const { useState, useEffect } = React
import { mailService } from "../services/mail.service.js";

export function DraftEdit({ editId, setIsEditing, isEditing, onSetMail }) {
    const [draftToEdit, setDraftToEdit] = useState()

    useEffect(() => {
        if (isEditing) {
            mailService.get(editId).then(draft => {
                console.log(draft)
            })
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
        // console.log(editId)
        // mailService.save(mailToEdit)
        //     .then(mail => {
        //         setMailToEdit()
        //         setIsEditing(false)
        //         onSetMail(mail)
        //         console.log(mail)
        //     })
    }

    function onSaveAsMail(ev) {
        ev.preventDefault()
    }

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
                    <span title="Discard draft" onClick={() => setIsAdding(false)} className="material-symbols-outlined discard-draft-icon">delete</span>
                </section>
            </form>
        </section>
    )
}