/**
 * CountdownTimer Component
 * Beautiful countdown to event start date
 * Shows days, hours, minutes with automatic updates
 */

'use client'

import { useState, useEffect } from 'react'

interface CountdownTimerProps {
  targetDate: string // ISO datetime string
  eventName?: string
}

interface TimeRemaining {
  days: number
  hours: number
  minutes: number
  seconds: number
  isExpired: boolean
}

export default function CountdownTimer({ targetDate, eventName = 'the event' }: CountdownTimerProps) {
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>(
    calculateTimeRemaining(targetDate)
  )

  useEffect(() => {
    // Update every second
    const interval = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining(targetDate))
    }, 1000)

    return () => clearInterval(interval)
  }, [targetDate])

  // If expired, don't show countdown
  if (timeRemaining.isExpired) {
    return null
  }

  return (
    <div className="bg-gradient-to-r from-terracotta/10 to-sage/10 rounded-2xl p-6 md:p-8">
      <div className="text-center mb-6">
        <p className="text-sm uppercase tracking-wide text-gray-600 font-semibold mb-2">
          Countdown to {eventName}
        </p>
        <p className="text-2xl md:text-3xl font-serif font-bold text-brown-warm">
          ⏰ Time is Ticking!
        </p>
      </div>

      <div className="grid grid-cols-4 gap-3 md:gap-4 max-w-2xl mx-auto">
        <TimeUnit value={timeRemaining.days} label="Days" />
        <TimeUnit value={timeRemaining.hours} label="Hours" />
        <TimeUnit value={timeRemaining.minutes} label="Minutes" />
        <TimeUnit value={timeRemaining.seconds} label="Seconds" />
      </div>

      <p className="text-center mt-6 text-gray-600">
        ✨ Order now to get festival-ready in time! ✨
      </p>
    </div>
  )
}

/**
 * Time Unit Component
 * Displays a single unit of time (days, hours, etc.)
 */
interface TimeUnitProps {
  value: number
  label: string
}

function TimeUnit({ value, label }: TimeUnitProps) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-md">
      <div className="text-3xl md:text-4xl font-bold text-terracotta mb-1">
        {value.toString().padStart(2, '0')}
      </div>
      <div className="text-xs md:text-sm text-gray-600 font-semibold uppercase tracking-wide">
        {label}
      </div>
    </div>
  )
}

/**
 * Calculate time remaining until target date
 */
function calculateTimeRemaining(targetDate: string): TimeRemaining {
  const target = new Date(targetDate).getTime()
  const now = new Date().getTime()
  const difference = target - now

  // If expired
  if (difference <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isExpired: true,
    }
  }

  // Calculate time units
  const days = Math.floor(difference / (1000 * 60 * 60 * 24))
  const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((difference % (1000 * 60)) / 1000)

  return {
    days,
    hours,
    minutes,
    seconds,
    isExpired: false,
  }
}
