import { eventBusService } from "../../../services/event-bus.service.js"

const { useState, useEffect, useRef } = React

export function UserMsg() {

    const [msg, setMsg] = useState(null)
    const timeoutIdRef = useRef()

    useEffect(() => {
        const onRemoveListener = eventBusService.on('show-user-msg', msg => {
            clearTimeout(timeoutIdRef.current)
            setMsg(msg)
            timeoutIdRef.current = setTimeout(closeMsg, 200000);
        })

        return () => onRemoveListener()

    }, [])


    function closeMsg() {
        clearTimeout(timeoutIdRef.current)
        setMsg(null)
    }

    if (!msg) return null
    return (
        <section className={`user-msg ${msg.type}`}>
            <p>{msg.txt}</p>
            <button onClick={closeMsg} className="close-btn">X</button>
        </section>
    )
}