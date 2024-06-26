import { MailFilter } from "./MailFilter.jsx";

export function MailHeader({ setFilterBy }) {
    return (
        <header className="mail-header">
            <section className="logo-container">
                <img className="logo" src="../assets/imgs/gmail.png" alt="" />
            </section>
            <MailFilter setFilterBy={setFilterBy} />
        </header>
    )
}