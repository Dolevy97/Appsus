const { Fragment } = React

export function TextReview({ handleChange }) {
    return (
        <Fragment>
            <label htmlFor="num"></label>
            <input name="rating" required onChange={handleChange} min={1} max={5} type="number" placeholder="rating" id="num" />
        </Fragment>
    )

}