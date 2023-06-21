import { NotificationContext } from '../../contexts/Notification'
import notifier from 'codex-notifier'
import React, { useContext, useEffect } from 'react'

const Notifier = () => {
  const [notification] = useContext(NotificationContext)

  useEffect(() => {
    if (notification?.message) {
      notifier.show(notification)
    }
  }, [notification])

  return (
    <style jsx global>
      {`
        .cdx-notify .cdx-notify__cross {
          right: 15px;
        }
        .cdx-notifies {
          z-index: 99999;
          height: fit-content;
        }
        :global(body .cdx-notifies) {
          top: 0px;
          left: 90%;
          transform: translateX(-50%);
        }
      `}
    </style>
  )
}

export default Notifier
