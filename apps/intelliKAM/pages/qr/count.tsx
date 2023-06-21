import { useRouter } from 'next/router'

export default function Count() {

  const router = useRouter();
  if (router.query.qid && router.query.text) {
    console.log(`https://wa.me/${router.query.qid}?text=${router.query.text}`)
    window.location.assign(`https://wa.me/${router.query.qid}?text=${router.query.text}`);
  }

  return (
    <>
    </>
  )
}
