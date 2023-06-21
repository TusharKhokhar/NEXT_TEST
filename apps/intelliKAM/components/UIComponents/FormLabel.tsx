/**
 * External dependencies
 */
import React from 'react'
import classnames from 'classnames'

const FormLabel: React.FC<any> = ({ children, className, ...labelProps }) => {
  return (
    <label
      {...labelProps}
      className={classnames(
        'text-[14px] mb-[10px] font-bold block',
        className
      )}
    >
      {children}
    </label>
  )
}

export default FormLabel
