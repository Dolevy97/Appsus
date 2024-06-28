export function StarReview({ handleChange }) {

    function setRating(num) {
        const obj = { target: { value: num, type: 'number', name: 'rating' } }
        return handleChange(obj)
    }

    return (
        <div className="star-container">
            <span className="star" onClick={() => setRating(1)}>⭐</span>
            <span className="star" onClick={() => setRating(2)}>⭐</span>
            <span className="star" onClick={() => setRating(3)}>⭐</span>
            <span className="star" onClick={() => setRating(4)}>⭐</span>
            <span className="star" onClick={() => setRating(5)}>⭐</span>
        </div>
    )

}