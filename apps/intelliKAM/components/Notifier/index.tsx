import dynamic from 'next/dynamic'

const Notifier: any = dynamic(() => import('./Notifier'), {
  ssr: false,
})

export default Notifier
