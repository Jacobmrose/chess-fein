function Footer() {
  return (
    <footer className='bg-blue-600 text-white p-4 text-center'>
      <div className='mb-2'>© 2024 Chess Fein</div>
      <div>
        <p>
          Feedback?{' '}
          <a href='/feedback' className='underline'>
            Let us know!
          </a>
        </p>
      </div>
    </footer>
  )
}

export default Footer
