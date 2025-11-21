import React, { useState } from "react";

const RaiseTicket = () => {
  const [issue, setIssue] = useState("");

  const handleSubmit = () => {
    if (issue.trim() === "") {
      alert("Please enter your issue before submitting.");
      return;
    }

    alert("✅ Ticket Raised Successfully");
    setIssue("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-6 md:p-8 rounded-xl shadow-xl border">

        {/* Header */}
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
          Raise a Support Ticket
        </h2>
        <p className="text-center text-sm text-gray-500 mb-6">
          Please describe your issue clearly.
        </p>

        {/* Issue Input */}
        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Issue Description
          </label>
          <textarea
            rows="5"
            value={issue}
            onChange={(e) => setIssue(e.target.value)}
            placeholder="Type your problem here..."
            className="w-full border rounded-md p-3 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition resize-none"
          />
        </div>

        {/* Submit button */}
        <button
          onClick={handleSubmit}
          className="w-full bg-red-600 hover:bg-red-700 text-white py-2.5 rounded-md font-semibold transition"
        >
          Submit Ticket
        </button>

        <p className="text-xs text-gray-400 text-center mt-4">
          Our support team will reach you shortly.
        </p>
      </div>
    </div>
  );
};

export default RaiseTicket;
