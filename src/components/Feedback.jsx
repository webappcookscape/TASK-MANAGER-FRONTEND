import React, { useState } from "react";
import { Star } from "lucide-react";

const Feedback = () => {
  const [rating, setRating] = useState(0);
  const [msg, setMsg] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (rating === 0 || msg.trim() === "") return;

    // READY for backend API call
    /*
    await axios.post("/api/client/feedback", {
      rating,
      message: msg
    });
    */

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-white p-6 rounded-xl shadow border text-center">
        <h2 className="text-xl font-semibold mb-2">Thank You!</h2>
        <p className="text-gray-600">Your feedback has been submitted.</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow border">
      <h2 className="text-xl font-semibold mb-4">Share Your Feedback</h2>

      {/* Star Rating */}
      <div className="flex gap-2 mb-4">
        {[1, 2, 3, 4, 5].map((num) => (
          <Star
            key={num}
            size={28}
            onClick={() => setRating(num)}
            className={`cursor-pointer ${
              num <= rating ? "text-yellow-500 fill-yellow-500" : "text-gray-400"
            }`}
          />
        ))}
      </div>

      {/* Message Box */}
      <textarea
        rows={4}
        placeholder="Write your feedback here..."
        className="w-full border rounded p-3 text-gray-700 focus:outline-indigo-500"
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
      ></textarea>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        className={`w-full mt-4 py-2 rounded text-white font-medium ${
          rating === 0 || msg.trim() === ""
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-indigo-600 hover:bg-indigo-700"
        }`}
      >
        Submit Feedback
      </button>
    </div>
  );
};

export default Feedback;
