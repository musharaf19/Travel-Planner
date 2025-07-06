import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';
import FeedbackForm from './Feedback';

function Hero() {
  const [feedback, setFeedback] = useState('');

  const faqData = [
    { question: 'How does the AI-powered itinerary work?', answer: 'Our AI analyzes your preferences, budget, and destination to create a personalized travel plan.' },
    { question: 'Can I customize my itinerary?', answer: 'Yes! You can modify and adjust the suggested itinerary to fit your needs.' },
    { question: 'Is the service free?', answer: 'Basic features are free, but premium plans offer advanced customization and recommendations.' }
  ];

  return (
    <div className='flex flex-col items-center mx-56 gap-8'>
      {/* Hero Section */}
      <h1 className='font-extrabold text-[50px] text-center mt-16 ml-10'>
        <span className='text-[#504947]'>From Dream to Destination with AI</span>
        <br />
        Personalized Itineraries at Your Fingertips
      </h1>
      <p className='text-2xl text-slate-600 text-center'>
        Say Goodbye to Stressful Planning - Let AI Create the Perfect Travel Experience, Suggesting the Best Destinations, Activities, and Dining Spots for You.
      </p>
      <Link to={'/create-trip'}>
        <Button className='h-12 w-full mt-5' >Get Started</Button>
      </Link>

      {/*Image Section */}
      <div className='w-full mt-10'>
        <img className='h-[600px] w-full object-cover rounded-xl' src="./Main.jpg" />
      </div>

      {/* FAQ Section */}
      <div className='w-full mt-12'>
        <h2 className='text-4xl font-bold text-center mb-8'>Frequently Asked Questions</h2>
        <div className='mt-6 space-y-10'>
          {faqData.map((faq, index) => (
            <div key={index} className='p-4 border rounded-lg hover:shadow-lg'>
              <h3 className='text-xl font-semibold'>{faq.question}</h3>
              <p className='text-slate-600'>{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Feedback Form */}
      <FeedbackForm />

    </div>
  );
}

export default Hero;
