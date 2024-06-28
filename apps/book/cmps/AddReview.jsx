import { bookService } from "../services/book.service.js"
import { SelectReview } from "./dynamic-input/SelectReview.jsx"
import { StarReview } from "./dynamic-input/StarReview.jsx"
import { TextReview } from "./dynamic-input/TextReview.jsx"

const { useState } = React

const { useParams, Link } = ReactRouterDOM


export function AddReview({ onAddReview }) {
    const [review, setReview] = useState(bookService.getEmptyReview)
    const [cmpType, setCmpType] = useState('select')

    const { bookId } = useParams()

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
            case 'select':
                value = target.selected
            default:
                break;
        }
        setReview(review => ({ ...review, [field]: value }))
    }




    return (
        <section>
            <form onSubmit={() => onAddReview(event, review)} className="add-review-form">
                <input required onChange={handleChange} name="fullName" type="text" placeholder="Enter your full name" />

                <h3>Choose your review rating type:</h3>
                <section className="cmp-type">
                    <article>
                        <label htmlFor="select">Select</label>
                        <input onChange={ev => setCmpType(ev.target.value)} value="Select" type="radio" name="rating-type" id="select" />
                    </article>
                    <article>
                        <label htmlFor="Textbox">Textbox</label>
                        <input onChange={ev => setCmpType(ev.target.value)} value="Textbox" type="radio" name="rating-type" id="Textbox" />
                    </article>
                    <article>
                        <label htmlFor="stars">Stars</label>
                        <input onChange={ev => setCmpType(ev.target.value)} value="Stars" type="radio" name="rating-type" id="stars" />
                    </article>
                </section>

                <DynamicCmp
                    cmpType={cmpType}
                    handleChange={handleChange}
                />

                <div className="read">
                    <label htmlFor="readAt">Read at: </label>
                    <input required onChange={handleChange} type="date" name="readAt" id="readAt" />
                </div>
                <button type="submit">Add your review</button>
            </form>



        </section>
    )
}



function DynamicCmp(props) {
    switch (props.cmpType) {
        case 'Select':
            return <SelectReview {...props} />
        case 'Textbox':
            return <TextReview {...props} />
        case 'Stars':
            return <StarReview {...props} />
        default:
            return null
    }
}