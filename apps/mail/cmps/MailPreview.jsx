export function MailPreview({ mail, getFormattedTime }) {
    return (
        <React.Fragment>
            <section className="mail-start flex align-center">
                <span className="material-symbols-outlined">star</span>
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
