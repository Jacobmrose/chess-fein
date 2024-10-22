import React, { useState } from 'react'

const FeedbackForm: React.FC = () => {
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [message, setMessage] = useState<string>('')
  const [submitted, setSubmitted] = useState<boolean>(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Basic validation
    if (!name || !email || !message) {
      alert('Please fill out all fields.')
      return
    }

    // Here you would typically handle sending the email
    console.log({
      name,
      email,
      message,
    })

    // Reset the form and show a success message
    setSubmitted(true)
    setName('')
    setEmail('')
    setMessage('')
  }

  return (
    <div className='max-w-lg mx-auto p-6 bg-gray-100 rounded-lg shadow-md'>
      {submitted ? (
        <p className='text-center text-green-600 font-semibold'>
          Thank you for your feedback!
        </p>
      ) : (
        <form onSubmit={handleSubmit} className='space-y-4'>
          <h2 className='text-2xl text-center font-bold'>Feedback Form</h2>
          <div>
            <label
              className='block mb-1 font-medium text-gray-700'
              htmlFor='name'
            >
              Name
            </label>
            <input
              type='text'
              id='name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
              placeholder='Your Name'
              required
            />
          </div>
          <div>
            <label
              className='block mb-1 font-medium text-gray-700'
              htmlFor='email'
            >
              Email
            </label>
            <input
              type='email'
              id='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
              placeholder='Your Email'
              required
            />
          </div>
          <div>
            <label
              className='block mb-1 font-medium text-gray-700'
              htmlFor='message'
            >
              Message
            </label>
            <textarea
              id='message'
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className='w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
              placeholder='Your Feedback'
              rows={4}
              required
            />
          </div>
          <button
            type='submit'
            className='w-full bg-blue-600 text-white font-bold py-2 rounded-md hover:bg-blue-700 transition-colors duration-300'
          >
            Send Feedback
          </button>
        </form>
      )}
    </div>
  )
}

export default FeedbackForm
