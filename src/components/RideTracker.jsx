import { useState, useEffect } from 'react'

const steps = ['Arriving', 'Arrived', 'Ride started']

function RideTracker() {
  // Random starting ETA between 4 and 8 minutes (runs only once)
  const [initialEta] = useState(() => Math.floor(4 + Math.random() * 5))
  const [eta, setEta] = useState(initialEta)
  const [stage, setStage] = useState('arriving') // arriving | arrived | started

  // 1. Countdown: runs every 2 seconds while the driver is arriving
  useEffect(() => {
    if (stage !== 'arriving') return

    const interval = setInterval(() => {
      setEta((prev) => Math.max(prev - 1, 0))
    }, 2000)

    return () => clearInterval(interval)
  }, [stage])

  // 2. When ETA reaches 0, driver has arrived
  useEffect(() => {
    if (stage === 'arriving' && eta === 0) {
      setStage('arrived')
    }
  }, [eta, stage])

  // 3. After 6 seconds at "arrived", the ride starts
  useEffect(() => {
    if (stage !== 'arrived') return

    const timer = setTimeout(() => setStage('started'), 6000)
    return () => clearTimeout(timer)
  }, [stage])

  const progress = ((initialEta - eta) / initialEta) * 100
  const currentStep = stage === 'arriving' ? 0 : stage === 'arrived' ? 1 : 2

  return (
    <div className="mt-4 border rounded-lg p-4">
      {/* Status message */}
      {stage === 'arriving' && (
        <p className="text-center font-bold text-lg">
          🚗 Driver arriving in {eta} min
        </p>
      )}
      {stage === 'arrived' && (
        <p className="text-center font-bold text-lg text-green-600">
          📍 Your driver has arrived!
        </p>
      )}
      {stage === 'started' && (
        <p className="text-center font-bold text-lg text-blue-600">
          🛣️ Ride started. Have a safe trip!
        </p>
      )}

      {/* Progress bar */}
      <div className="mt-3 w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-yellow-400 transition-all duration-1000"
          style={{ width: `${stage === 'arriving' ? progress : 100}%` }}
        ></div>
      </div>

      {/* Step indicator */}
      <div className="mt-3 flex justify-between text-xs sm:text-sm">
        {steps.map((label, index) => (
          <span
            key={label}
            className={
              index <= currentStep ? 'font-bold text-black' : 'text-gray-400'
            }
          >
            {index <= currentStep ? '● ' : '○ '}
            {label}
          </span>
        ))}
      </div>
    </div>
  )
}

export default RideTracker