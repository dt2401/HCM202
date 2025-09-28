import React from 'react'
import clsx from 'clsx'

// Basic Button component supporting variants, size, and extra classes
export function Button({
  children,
  variant = 'default',
  size = 'md',
  className = '',
  ...rest
}) {
  const variantClasses = {
    default: 'bg-red-700 hover:bg-red-600 text-yellow-200 border border-yellow-400/30',
    outline: 'border border-yellow-400 text-yellow-300 bg-transparent hover:bg-red-700/40',
    ghost: 'bg-transparent hover:bg-red-700/40 text-yellow-200',
    destructive: 'bg-red-600 hover:bg-red-500 text-white',
  }
  const sizeClasses = {
    sm: 'text-sm px-3 py-1.5',
    md: 'text-sm px-4 py-2',
    lg: 'text-base px-6 py-3'
  }
  return (
    <button
      className={clsx('rounded-md font-medium tracking-wide transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-400/60 focus:ring-offset-2 focus:ring-offset-red-800 disabled:opacity-60 disabled:cursor-not-allowed',
        variantClasses[variant] || variantClasses.default,
        sizeClasses[size] || sizeClasses.md,
        className)}
      {...rest}
    >
      {children}
    </button>
  )
}
