import { createSlice } from "@reduxjs/toolkit";
import {
    adminInfoObject,
    companyInfoObject,
    planDetailsObject
} from "../../constants/constants";

const initialState = {
    step: 0,
    companyInfo: companyInfoObject,
    adminInfo: adminInfoObject,
    planDetails: planDetailsObject,
}

export const corporateRegistrationSlice = createSlice({
    name: 'corporateRegistration',
    initialState,
    reducers: {
        corporateRegistrationStep: (state, action) => {
            state.step = action.payload
        },
        companyInformation: (state, action) => {
            state.companyInfo = action.payload
        },
        adminInformation: (state, action) => {
            state.adminInfo = action.payload
        },
        planDetails: (state, action) => {
            state.planDetails = action.payload
        },
    }
});

export const {
    corporateRegistrationStep,
    companyInformation,
    adminInformation,
    planDetails
} =
    corporateRegistrationSlice.actions
export default corporateRegistrationSlice.reducer