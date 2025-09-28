import React from 'react'
import clsx from 'clsx'

export function Badge({ className='', variant='secondary', children }) {
  const variants = {
    secondary: 'bg-yellow-200 text-red-800',
    outline: 'border border-red-600 text-red-600',
  }
  return (
    <span className={clsx('inline-flex items-center rounded-md px-2 py-1 text-xs font-semibold', variants[variant] || variants.secondary, className)}>
      {children}
    </span>
  )
}
