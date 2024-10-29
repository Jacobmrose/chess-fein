function Footer() {
  return (
    <footer className='bg-gray-900 text-white p-4 text-center w-full'>
      <div className='mb-2'>
        © 2024{' '}
        <a href='/' className='underline hover:text-purple-300'>
          Chess Fein
        </a>
      </div>
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
