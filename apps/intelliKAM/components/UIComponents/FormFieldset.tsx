/**
 * External dependencies
 */

import React from 'react'
import classnames from 'classnames'

const FormFieldset: React.FC<any> = ({
  className,
  children,
  ...otherProps
}) => (
  <fieldset {...otherProps} className={classnames('mb-[20px]', className)}>
    {children}
  </fieldset>
)

export default FormFieldset
