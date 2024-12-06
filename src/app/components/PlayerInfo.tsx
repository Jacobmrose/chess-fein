interface PlayerInfoProps {
  playerName: string
  timer?: number // Make timer optional
  isActive: boolean
  position: 'top' | 'bottom'
  color: 'white' | 'black'
  materialDifference?: number
}

const PlayerInfo: React.FC<PlayerInfoProps> = ({
  playerName,
  timer, // Now optional
  isActive,
  position,
  color,
  materialDifference = 0,
}) => {
  return (
    <div
      className={`flex justify-between items-center w-full py-2 px-4 sm:py-3 sm:px-6 rounded-lg shadow-lg
        ${position === 'top' ? 'flex-row' : 'flex-row-reverse'}
        ${
          isActive
            ? color === 'white'
              ? 'bg-gray-500 text-black'
              : 'bg-gray-500 text-white'
            : color === 'white'
            ? 'bg-white text-gray-800'
            : 'bg-black text-gray-300'
        }`}
    >
      {/* Player Name */}
      <div className='text-sm sm:text-base md:text-md font-medium text-center flex-1 whitespace-nowrap overflow-hidden overflow-ellipsis'>
        {playerName}
      </div>

      {/* Material Difference */}
      {materialDifference !== 0 && (
        <div className='text-xs sm:text-sm md:text-base font-semibold text-center flex-1'>
          {materialDifference > 0
            ? `+${materialDifference}`
            : materialDifference}
        </div>
      )}

      {/* Timer */}
      {timer !== undefined && (
        <div className='text-sm sm:text-base md:text-lg font-medium text-center flex-1'>
          {`${Math.floor(timer / 60)}:${(timer % 60)
            .toString()
            .padStart(2, '0')}`}
        </div>
      )}
    </div>
  )
}

export default PlayerInfo
