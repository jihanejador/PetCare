import React from 'react';

export default function StarRating({ rating, setRating = null, readOnly = false }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={readOnly}
          onClick={() => setRating && setRating(star)}
          className={`text-xl transition-transform ${
            !readOnly ? 'hover:scale-125 cursor-pointer' : 'cursor-default'
          } ${star <= rating ? 'text-amber-400' : 'text-gray-300'}`}
        >
          ★
        </button>
      ))}
    </div>
  );
}