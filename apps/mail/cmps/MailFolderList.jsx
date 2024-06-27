
export function MailFolderList({ onSetFilterBy }) {


    function onChangeFolder(folder) {
        onSetFilterBy(folder)
    }

    return (
        <section className="mail-folder-list">
            <section className="folder-titles">
                <div onClick={() => { onChangeFolder({ status: 'inbox' }) }} className="title">Inbox</div>
                <div onClick={() => { onChangeFolder({ status: 'starred' }) }} className="title">Starred</div>
                <div onClick={() => { onChangeFolder({ status: 'sent' }) }} className="title">Sent</div>
                <div onClick={() => { onChangeFolder({ status: 'drafts' }) }} className="title">Drafts</div>
                <div onClick={() => { onChangeFolder({ status: 'trash' }) }} className="title">Trash</div>
            </section>
            <span onClick={() => { onChangeFolder({ status: 'inbox' }) }} className="material-symbols-outlined active">inbox</span>
            <span onClick={() => { onChangeFolder({ status: 'starred' }) }} className="material-symbols-outlined">star</span>
            <span onClick={() => { onChangeFolder({ status: 'sent' }) }} className="material-symbols-outlined">send</span>
            <span onClick={() => { onChangeFolder({ status: 'drafts' }) }} className="material-symbols-outlined">draft</span>
            <span onClick={() => { onChangeFolder({ status: 'trash' }) }} className="material-symbols-outlined">delete</span>
        </section>
    )
}

