import ChoosePlanStep from '../components/Registration/ChoosePlanStep'
import YourInfoStep from '../components/Registration/YourInfoStep'
import DoneStep from '../components/Registration/done'
import { RootState } from '../store/store'
import { useSelector } from 'react-redux'

export default function Index() {
  const registrationSteps = useSelector(
    (state: RootState) => state.registrationSteps.value
  );

  return (
    <>
    {
      registrationSteps === 0 ? (
        <ChoosePlanStep />
      ) : registrationSteps === 1 ? (
        <YourInfoStep />
      ) : registrationSteps === 2 ? (
        <DoneStep />
      ) : (
        ''
      )
    }
    </>
  )
}
