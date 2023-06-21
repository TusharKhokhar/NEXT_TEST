import React, { useState } from 'react';
import { swr as useSWR } from 'lib';
import { priceFormat } from '../../../lib/functions';
import Button, { ButtonKind, ButtonSize } from '../../../common/Button';
import Icon from '../../../components/Icons';
import Link from 'next/link';
import useNotifications from '../../../hooks/useNotification';
import { safeFetch } from 'fetcher';

export default function Plans() {
  const { data: plans, mutate } = useSWR('/api/plans');
  const notifier = useNotifications();

  const confirmModal = (planId: string) => {
    notifier({
      message: 'Are you really want to delete plan?',
      type: 'confirm',
      okText: 'Yes',
      cancelText: 'Oh, wait',
      okHandler: () => deletePlan(planId)
    })
  }

  const deletePlan = async (planId: string) => {
    const result = await safeFetch('/api/plans/delete', {
      body: {
        id: planId
      },
      method: 'delete'
    });
    if (result.error) {
      notifier({
        message: "Something went wrong.",
        style: "error",
      });
      return;
    }
    mutate()
    notifier({
      message: "Plan deleted successfully",
      style: "success"
    })
  }

  return (
    <div className="w-3/4 m-auto pt-5">
      <div className="text-right mb-2">
        <Link href="/admin/plans/create">
          <a>
            <Button kind={ButtonKind.primaryCta} size={ButtonSize.medium}>
              <Icon
                icon="plus"
                size={15}
                className="mb-1 mr-1"
                color="text-white"
              />{' '}
              Create Product
            </Button>
          </a>
        </Link>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <caption className="p-5 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800">
            Plans
          </caption>
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Plan name
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Included Videos
              </th>
              <th scope="col" className="px-6 py-3">
                Features
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {plans &&
              plans.map((plan: any) => (
                <tr
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  key={plan.id}
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {plan.name}
                  </th>
                  <td className="px-6 py-4">${priceFormat(plan.price)}</td>
                  <td className="px-6 py-4">{plan.includedVideos}</td>
                  <td className="px-6 py-4">
                    <ul className="list-disc">
                      {plan.features.map((feature: string, index: number) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </td>
                  <td className="px-6 py-4 flex justify-between">
                    <a
                      href={`/admin/plans/${plan.id}`}
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Edit
                    </a>

                    <a
                      className="font-medium text-red-400 dark:text-red-500 hover:underline cursor-pointer"
                      onClick={() => confirmModal(plan.id)}
                    >
                      Delete
                    </a>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
