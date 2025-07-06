import React, { useState } from 'react';
import { Button } from '../ui/button';
import emailjs from 'emailjs-com';

function FeedbackForm() {
  const [feedback, setFeedback] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const sendFeedback = (e) => {
    e.preventDefault();

    if (!name || !email || !feedback) {
      alert('Please fill in all fields before submitting.');
      return;
    }

    emailjs
      .send(
        'service_fg9g9ad',
        'template_1',
        {
          from_name: name,
          from_email: email,
          message: feedback
        },
        'HWeKAOKv4m3tIaL-d'
      )
      .then((response) => {
        console.log('Success!', response.status, response.text);
        alert('Feedback sent successfully!');
        setFeedback('');
        setName('');
        setEmail('');
      })
      .catch((err) => {
        console.error('Failed to send feedback:', err);
        alert('Something went wrong. Please try again.');
      });
  };

  return (
    <div className="w-full mt-12 px-4">
      <h2 className="text-4xl font-bold text-center pb-5 text-gray-900 dark:text-white">
        Your Feedback Matters!
      </h2>

      <form
        onSubmit={sendFeedback}
        className="w-full max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg
                   dark:bg-black"
      >
        <input
          type="text"
          className="w-full p-3 mb-4 border rounded-lg
                     bg-white text-gray-900 placeholder-gray-500
                     dark:bg-black dark:text-white dark:placeholder-gray-400 dark:border-gray-700"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          className="w-full p-3 mb-4 border rounded-lg
                     bg-white text-gray-900 placeholder-gray-500
                     dark:bg-black dark:text-white dark:placeholder-gray-400 dark:border-gray-700"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <textarea
          className="w-full p-4 mb-4 border rounded-lg shadow-sm
                     bg-white text-gray-900 placeholder-gray-500
                     dark:bg-black dark:text-white dark:placeholder-gray-400 dark:border-gray-700"
          rows="4"
          placeholder="Share your thoughts..."
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        ></textarea>

        <Button type="submit" className="w-full mt-4">
          Submit Feedback
        </Button>
      </form>
    </div>
  );
}

export default FeedbackForm;
