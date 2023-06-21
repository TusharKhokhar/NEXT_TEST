import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'
import { registrationStepsSlice } from './slices/registrationSteps'
import { corporateRegistrationSlice } from './slices/corporateRegistration'

const rootReducer = combineReducers({
  registrationSteps: registrationStepsSlice.reducer,
  corporateRegistration : corporateRegistrationSlice.reducer
})

export type RootState = ReturnType<typeof rootReducer>

const rootStore = () =>
  configureStore({
    reducer: rootReducer,
    devTools: true,
  })

export const reduxWrapper = createWrapper(rootStore)
