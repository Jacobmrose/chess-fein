import React from 'react'

interface ConfirmationDialogProps {
  show: boolean
  onConfirm: () => void
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  show,
  onConfirm,
}) => {
  if (!show) return null

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50'>
      <div className='bg-white p-6 rounded-lg shadow-lg w-1/3'>
        <h2 className='text-xl font-semibold text-center text-black mb-4'>
          No Puzzles Left In Selected Theme
        </h2>
        <p className='text-center text-black mb-6'>
          You will be redirected shortly to the theme selection menu...
        </p>
        <div className='flex justify-center'>
          <button
            onClick={onConfirm}
            className='bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition duration-300 text-'
          >
            OK
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmationDialog
