import { NotificationContext } from '../contexts/Notification'
import { useContext } from 'react'

function useNotifications() {
  return useContext(NotificationContext)[1]
}

export default useNotifications
