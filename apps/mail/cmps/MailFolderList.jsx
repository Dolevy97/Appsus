
export function MailFolderList() {


    function onChangeFolder(folder) {
        console.log(folder)
    }

    return (
        <section className="mail-folder-list">
            <section className="folder-titles">
                <div onClick={() => { onChangeFolder('title') }} className="title">Inbox</div>
                <div onClick={() => { onChangeFolder('starred') }} className="title">Starred</div>
                <div onClick={() => { onChangeFolder('sent') }}className="title">Sent</div>
                <div onClick={() => { onChangeFolder('drafts') }}className="title">Drafts</div>
            </section>
            <span onClick={() => { onChangeFolder('title') }} className="material-symbols-outlined active">inbox</span>
            <span onClick={() => { onChangeFolder('starred') }}className="material-symbols-outlined">star</span>
            <span onClick={() => { onChangeFolder('sent') }}className="material-symbols-outlined">send</span>
            <span onClick={() => { onChangeFolder('drafts') }}className="material-symbols-outlined">draft</span>
        </section>
    )
}

