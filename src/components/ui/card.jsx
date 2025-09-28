import React from 'react'
import clsx from 'clsx'

export function Card({ className='', children, ...rest }) {
  return <div className={clsx('rounded-lg border shadow-sm bg-white/90 backdrop-blur-sm overflow-hidden', className)} {...rest}>{children}</div>
}
export function CardHeader({ className='', children, ...rest }) {
  return <div className={clsx('p-4 border-b', className)} {...rest}>{children}</div>
}
export function CardTitle({ className='', children, ...rest }) {
  return <h3 className={clsx('font-bold leading-none tracking-tight', className)} {...rest}>{children}</h3>
}
export function CardDescription({ className='', children, ...rest }) {
  return <p className={clsx('text-sm text-red-700/80', className)} {...rest}>{children}</p>
}
export function CardContent({ className='', children, ...rest }) {
  return <div className={clsx('p-4', className)} {...rest}>{children}</div>
}
