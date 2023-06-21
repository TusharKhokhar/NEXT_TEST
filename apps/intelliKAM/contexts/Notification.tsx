import {
  ConfirmNotifierOptions,
  NotifierOptions,
  PromptNotifierOptions,
} from 'codex-notifier'
import { Context, createContext, Dispatch, SetStateAction } from 'react'

type NotificationDispatch = Dispatch<SetStateAction<CNOptions>>
const notificationDispatch: NotificationDispatch = () => null

export type CNOptions =
  | null
  | ConfirmNotifierOptions
  | NotifierOptions
  | PromptNotifierOptions

export const NotificationContext: Context<[CNOptions, NotificationDispatch]> =
  createContext<[CNOptions, NotificationDispatch]>([null, notificationDispatch])
