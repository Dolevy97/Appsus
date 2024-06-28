const { useEffect, useState, useRef } = React

export function ReviewList({ reviews, onDeleteReview }) {
    const reviewRef = useRef({})
    return (
        <section className="reviews">
            <h2>Reviews:</h2>
            {!reviews.length && <h3>No reviews yet.. Add the first one!</h3>}
            {reviews && reviews.map(review => {
                return <div className="review-container" ref={(el) => reviewRef.current[review.id] = el} key={review.id}>
                    <h3>Name: {review.fullName}</h3>
                    <h3>Rating: {'⭐'.repeat(review.rating)}</h3>
                    <h3>Read at: {review.readAt}</h3>
                    <button onClick={() => onDeleteReview(review.id, reviewRef.current[review.id])}>X</button>
                </div>
            })}
        </section>
    )
}