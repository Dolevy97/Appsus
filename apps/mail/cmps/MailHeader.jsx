const { useState } = React
import { MailCompose } from "./MailCompose.jsx";
import { MailFilter } from "./MailFilter.jsx";



export function MailHeader({ setFilterBy, setMails, mails, onOpenSideBar, setIsAdding, isAdding }) {

    function onSetMail(updatedMail) {
        const updatedMails = [...mails, updatedMail]
        setMails(updatedMails)
    }


    return (
        <header className="mail-header">
            <section className="logo-menu-container">
                <article onClick={onOpenSideBar} className="menu-container">
                    <span className="material-symbols-outlined hamburger-icon">menu</span>
                </article>
                <article className="logo-container">
                    <img className="logo" src="./../../assets/imgs/gmail.png" alt="" />
                </article>
            </section>
            <MailFilter setFilterBy={setFilterBy} />
            <MailCompose
                setIsAdding={setIsAdding}
                isAdding={isAdding}
                onSetMail={onSetMail}
            />
        </header>
    )
}