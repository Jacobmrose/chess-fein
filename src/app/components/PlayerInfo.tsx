interface PlayerInfoProps {
  playerName: string
  timer: number
  isActive: boolean // Active player flag determines if this player's timer counts down
  position: 'top' | 'bottom'
  color: 'white' | 'black'
}

const PlayerInfo: React.FC<PlayerInfoProps> = ({
  playerName,
  timer,
  isActive,
  position,
  color,
}) => {
  return (
    <div
      className={`flex justify-between items-center w-full py-2 px-4 rounded-lg shadow-lg
        ${position === 'top' ? 'flex-row' : 'flex-row-reverse'}
        ${
          isActive
            ? color === 'white'
              ? 'bg-gray-500 text-black' // Active white
              : 'bg-gray-500 text-white' // Active black
            : color === 'white'
            ? 'bg-white text-gray-800' // Inactive white
            : 'bg-black text-gray-300' // Inactive black
        }`}
    >
      <div className='text-lg font-medium'>{playerName}</div>
      <div className='text-xl font-bold'>
        {/* Format time as mm:ss */}
        {`${Math.floor(timer / 60)}:${(timer % 60)
          .toString()
          .padStart(2, '0')}`}
      </div>
    </div>
  )
}

export default PlayerInfo
