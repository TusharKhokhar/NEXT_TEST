import React from "react";
import ComponyInfo from "../components/CorporateRegisteration/CompanyInfo";
import AdminInfo from "../components/CorporateRegisteration/AdminInfo";
import PlanDetails from "../components/CorporateRegisteration/PlanDetails";
import Done from "../components/CorporateRegisteration/Done";
import BillingContact from "../components/CorporateRegisteration/BillingContact";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useSession } from "next-auth/react";

export default function Dashboard() {
  const step = useSelector(
    (state: RootState) => state.corporateRegistration.step
  );
  const { data: session }: any = useSession();

  console.log("session", session);

  const getData = () => {
    debugger;
  };

  return (
    <>
      <div className="w-[92.2%] ml-auto pt-24 inner_container">
        <div className="mb-[54px]">
          <h1 className="text-4xl text-primary font-extrabold">New Customer</h1>
        </div>
        {step === 0 && <ComponyInfo />}
        {step === 1 && <AdminInfo />}
        {step === 2 && <PlanDetails />}
        {step === 3 && <BillingContact />}
        {step === 4 && <Done />}
      </div>
    </>
  );
}
