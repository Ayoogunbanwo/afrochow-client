import React, { useState } from "react";
import { ThumbsUp, BadgeCheck } from "lucide-react";

const ReviewsSection = ({ reviews }) => {
  const [helpfulReviews, setHelpfulReviews] = useState(new Set());
  const [showAll, setShowAll] = useState(false);

  const markHelpful = (reviewId) => {
    setHelpfulReviews((prev) => new Set(prev).add(reviewId));
  };

  const renderStars = (rating) => (
    <div className="flex">
      {[...Array(5)].map((_, i) => (
        <span key={i}>
          {i < rating ? (
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="#FFD700"
              stroke="#FFD700"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          ) : (
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#D1D5DB"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          )}
        </span>
      ))}
    </div>
  );

  const displayedReviews = showAll ? reviews : reviews.slice(0, 3);

  return (
    <section id="reviews" className="container px-6 py-12 mx-auto">
      <h2 className="mb-8 text-3xl font-bold text-center">Customer Reviews</h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {displayedReviews.map((review) => (
          <div
            key={`${review.reviewid}-${review.userName}`} // Ensuring key uniqueness
            className="p-6 bg-white rounded-lg shadow-md"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <img
                  src={review.userImage}
                  alt={review.userName}
                  className="w-10 h-10 rounded-full"
                  loading="lazy"
                />
                <div className="ml-4">
                  <h3 className="text-lg font-semibold">{review.userName}</h3>
                  <div className="flex items-center space-x-2">
                    {review.verified && (
                      <BadgeCheck className="w-4 h-4 text-green-500" />
                    )}
                    <p className="text-sm text-gray-600">{review.date}</p>
                  </div>
                </div>
              </div>
              {renderStars(review.rating)}
            </div>
            <p className="mb-4 text-gray-700">{review.comment}</p>
            <button
              onClick={() => markHelpful(review.reviewid)}
              disabled={helpfulReviews.has(review.reviewid)}
              className={`flex items-center text-sm ${
                helpfulReviews.has(review.reviewid)
                  ? "text-gray-400"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <ThumbsUp className="w-4 h-4 mr-2" />
              {helpfulReviews.has(review.reviewid) ? "Marked as helpful" : "Helpful"}
            </button>
          </div>
        ))}
      </div>
      {reviews.length > 3 && (
        <div className="flex justify-center mt-8">
          <button
            onClick={() => setShowAll((prev) => !prev)}
            className="px-6 py-2 text-white bg-orange-500 rounded-lg hover:bg-orange-600"
          >
            {showAll ? "Show Less" : "View All"}
          </button>
        </div>
      )}
    </section>
  );
};

export default ReviewsSection;
