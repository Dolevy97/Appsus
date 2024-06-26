const { useState } = React
import { MailFilter } from "./MailFilter.jsx";



export function MailHeader({ setFilterBy }) {
    const [isAdding, setIsAdding] = useState(false)

    function onCompose({ target }) {
        console.log(target)
        setIsAdding(!isAdding)
    }

    function onAddMail() {
        console.log('Added!')
    }

    return (
        <header className="mail-header">
            <section onClick={onCompose} className="compose-container">
                <span className="material-symbols-outlined">edit</span>
            </section>
            <section className="logo-container">
                <img className="logo" src="../assets/imgs/gmail.png" alt="" />
            </section>
            <MailFilter setFilterBy={setFilterBy} />
            {isAdding &&
                <section className="compose-mail">
                    <form onSubmit={onAddMail} className="compose-form-container">
                        <h1>New Message</h1>

                        {/* <h2>`From ${}`</h2> */}

                        <div className="input-to">
                            <label htmlFor="mail-to"></label>
                            <input id="mail-to" type="text" name="input-to" />
                        </div>

                        <div className="input-subject">
                            <label htmlFor="subject"></label>
                            <input id="subject" type="text" name="input-subject" />
                        </div>

                        <textarea name="" id="">
                        </textarea>

                        <button className="btn-send">Send</button>
                    </form>
                </section>}
        </header>
    )
}