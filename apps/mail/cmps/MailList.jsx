import { MailPreview } from "../pages/MailPreview.jsx"

export function MailList({ mails, setMails, setIsEditing, setEditId }) {


    function getFormattedTime(time) {
        if (time === null) return 
        const date = new Date(time * 1000)
        const today = Math.floor(Date.now() / 1000)
        const day = 60 * 60 * 24
        const currYear = new Date().getFullYear()
        const diff = today - time // The diff between today and the time of the mail
        if (diff < day) return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
        else if (date.getFullYear() === currYear) return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(date)
        else return new Intl.DateTimeFormat('en-US').format(date)
    }

    function onDeleteMail(updatedMail, fullDelete = false) {
        var updatedMails
        if (fullDelete) {
            updatedMails = mails.filter(mail => mail.id !== updatedMail)
        } else {
            updatedMails = mails.filter(mail => mail.id !== updatedMail.id)
        }
        setMails([...updatedMails])
    }

    function onSetMail(updatedMail, fullDelete = false) {
        const updatedMails = mails.map(mail => {
            if (mail.id === updatedMail.id) return updatedMail
            return mail
        })
        setMails([...updatedMails])
    }

    return (
        <section className="mails-container">
            {mails.map(mail =>
                <MailPreview
                    mail={mail}
                    getFormattedTime={getFormattedTime}
                    onSetMail={onSetMail}
                    onDeleteMail={onDeleteMail}
                    setIsEditing={setIsEditing}
                    setEditId={setEditId}
                    key={mail.id}
                />

            )}
        </section >
    )
}
