import React from 'react';
import PlanForm from '../../../components/PlanForm';
import { useRouter } from 'next/router';

export default function Edit() {
  const {query} = useRouter();
  
  return (
    <div className="w-1/2 m-auto pt-5">
      <PlanForm id={query.id as string} />
    </div>
  )
}
