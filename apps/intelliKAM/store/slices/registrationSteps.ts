import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: 0,
  isCodeSent : false,
  selectedPlan : ''
}

export const registrationStepsSlice = createSlice({
  name: 'registrationSteps',
  initialState,
  reducers: {
    updateRegistrationStep: (state, action) => {
      state.value = action.payload
    },
    selectedPlan: (state, action) => {
      state.selectedPlan = action.payload
    },
    sendCode: (state, action) => {
      state.isCodeSent = action.payload
    }
  },
})

export const {
   updateRegistrationStep,
   selectedPlan,
   sendCode } =
  registrationStepsSlice.actions
export default registrationStepsSlice.reducer
