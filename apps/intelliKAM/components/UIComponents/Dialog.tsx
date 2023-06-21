import classNames from 'classnames'
import Image from 'next/image'
import React, { useEffect } from 'react'
import closeImage from '../../public/images/close_icon.svg'

interface DialogProps {
  open: boolean
  onClose: () => void
  children: React.ReactChild
  closeIcon?: boolean
  className?: string
  backDropClassName?: string
  additionalClassName?: string
}
export default function Dialog({
  open,
  onClose,
  closeIcon = true,
  children,
  className,
  backDropClassName,
  additionalClassName,
}: DialogProps) {
  return (
    <>
      <dialog
        id="custom_dialog"
        className={classNames('modal', className)}
        open={open}
      >
        <form
          method="dialog"
          className={classNames(
            'modal-box rounded-[10px] max-w-[90%] max-h-[90%]',
            additionalClassName
          )}
        >
          {closeIcon && (
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={onClose}
            >
              <Image src={closeImage} alt="close" />
            </button>
          )}
          {children}
        </form>
        <form
          method="dialog"
          className={classNames(
            'modal-backdrop bg-secondary opacity-40',
            backDropClassName
          )}
        >
          <button onClick={onClose}>close</button>
        </form>
      </dialog>
    </>
  )
}
