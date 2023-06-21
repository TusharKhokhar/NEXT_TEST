import React from 'react';
import Image from 'next/image';
import customerImage from '../public/images/customer.png';
import anoucmentImage from '../public/images/anoucment.png';
import cardImage from '../public/images/card.png';
import networkImage from '../public/images/network.png';
import settingImage from '../public/images/setting.png';
import account_settingImage from '../public/images/account_setting.png';

const Sidebar = () => {
    return (
        <div className="w-[83px] bg-primary h-screen pt-[82px] pb-5 px-4 flex flex-col justify-between">
            <ul className="">
                <li className="h-[52px] p-2 border-2 rounded-sm border-complimentary text-center">
                    <a href="#">
                        <Image src={customerImage} className="m-auto" alt="" />
                    </a>
                </li>
                <li className='h-[52px] mt-[15px] text-center'>
                    <a href="/campaign/create">
                        <Image src={anoucmentImage} className="m-auto" alt="" />
                    </a>
                </li>
                <li className="h-[52px] mt-[-3px] p-2 text-center">
                    <a href="#">
                        <Image src={cardImage} className="m-auto" alt="" />
                    </a>
                </li>
                <li className='h-[52px] text-center mt-[13px]'>
                    <a href="#">
                        <Image src={networkImage} className="m-auto" alt="" />
                    </a>
                </li>
                <li className="h-[52px] p-2 text-center mt-[-3px]">
                    <a href="#">
                        <Image src={settingImage} className="m-auto" alt="" />
                    </a>
                </li>
            </ul>
            <ul className="space-y-4">
                <li className='h-[52px] text-center'>
                    <a href="#">
                        <Image src={account_settingImage} className="m-auto" alt="" />
                    </a>
                </li>
            </ul>
        </div>
    )
}

export default Sidebar
