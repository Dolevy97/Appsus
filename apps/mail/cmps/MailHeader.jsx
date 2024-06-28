const { useState } = React
import { DraftEdit } from "./DraftEdit.jsx";
import { MailCompose } from "./MailCompose.jsx";
import { MailFilter } from "./MailFilter.jsx";



export function MailHeader({ onChangeFolder, editId, setIsEditing, isEditing, setFilterBy, setMails, mails, onOpenSideBar, setIsAdding, isAdding }) {

    function onSetMail(updatedMail) {
        const updatedMails = [...mails, updatedMail]
        setMails(updatedMails)
    }

    function onSetDraft(updatedDraft) {
        var updatedMails = mails.filter(mail => mail.id !== updatedDraft.id)
        updatedMails = [...updatedMails, updatedDraft]
        setMails(updatedMails)
    }

    return (
        <header className="mail-header">
            <section className="logo-menu-container">
                <article onClick={onOpenSideBar} className="menu-container">
                    <span className="material-symbols-outlined hamburger-icon">menu</span>
                </article>
                <article className="logo-container">
                    <img className="logo" src="./assets/imgs/gmail.png" alt="" />
                </article>
            </section>
            <MailFilter setFilterBy={setFilterBy} />
            <MailCompose
                setIsAdding={setIsAdding}
                isAdding={isAdding}
                onSetMail={onSetMail}
            />
            <DraftEdit
                setIsEditing={setIsEditing}
                isEditing={isEditing}
                onSetMail={onSetMail}
                onSetDraft={onSetDraft}
                editId={editId}
                onChangeFolder={onChangeFolder}
            />
        </header>
    )
}