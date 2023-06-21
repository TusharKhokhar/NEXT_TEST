import React from 'react';
import Button, { ButtonKind, ButtonSize } from '../common/Button';
import Icon from './Icons';
import { swr as useSWR } from 'lib';

export default function Subscription() {
  const {data: plans} = useSWR("/api/plans");
  return (
    <div>
      <div className="flex min-h-screen pt-[30px] px-[40px]">
        <div className="min-w-full">
          <div className="mt-[20px] grid grid-cols-4 gap-[20px]">
            {plans && plans.map((plan: any, i: number) => (
              <div
                key={i}
                className="w-full bg-[#fff] rounded-[10px] shadow-[0px 1px 2px #E1E3E5] border border-[#E1E3E5] divide-y"
              >
                <div className="pt-[15px] px-[25px] pb-[25px]">
                  <div>
                    <p className="text-[#00153B] text-[19px] leading-[24px] font-bold">
                      {plan.name} Plan
                    </p>
                    <p className="text-[#00153B] text-[50px] leading-[63px] font-bold">
                      ${plan.price}
                    </p>
                  </div>
                  <div>
                    <p className="text-[#717F87] text-sm leading-[28px] font-medium">
                      {plan.includedVideos} Included Videos
                    </p>
                  </div>
                </div>
                <div className="pt-[25px] px-[25px] pb-[35px]">
                  <div className="font-bold">What&apos;s Included</div>
                  <div>
                    {plan.features.map((feature: string, idx: number) => (
                      <p className="text-[#717F87] text-[14px] leading-[24px] font-medium" key={`${plan.name}-${idx}`}>
                        <Icon icon="checkmark" size={10} color="green" /> {feature}
                      </p>
                    ))}
                  </div>
                  <div className="mt-[25px]">
                    <Button
                      kind={ButtonKind.primaryCta}
                      size={ButtonSize.medium}
                    >
                      Choose Plan
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
