import { useSelector } from 'react-redux'
import { RootState } from '../store/store'
import AccountVerification from '../components/Registration/AccountVerification'
import CodeVerification from '../components/Registration/CodeVerification'

const Verification = () => {
  const isCodeSent = useSelector(
    (state: RootState) => state.registrationSteps.isCodeSent
  );

  return <>{!isCodeSent ? <AccountVerification /> : <CodeVerification />}</>
}
export default Verification;
