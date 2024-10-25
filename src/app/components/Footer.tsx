function Footer() {
  return (
    <footer className='bg-gray-900 text-white p-4 text-center w-full fixed bottom-0 left-0'>
      <div className='mb-2'>© 2024 Chess Fein</div>
      <div>
        <p>
          Feedback?{' '}
          <a href='/feedback' className='underline hover:text-purple-300'>
            Let us know!
          </a>
        </p>
      </div>
    </footer>
  )
}

export default Footer
