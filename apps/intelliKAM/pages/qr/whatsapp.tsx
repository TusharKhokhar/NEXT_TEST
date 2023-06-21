import { useRouter } from 'next/router'
import WhatsappForm from '../../components/whatsappQRForm';

export default function Whatsapp() {

  return (
    <>
    <div>
      <div className="w-1/2 m-auto pt-5">
        <WhatsappForm />
      </div>
    </div>
    </>
  )
}
