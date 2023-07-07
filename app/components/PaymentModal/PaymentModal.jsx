'use client'

import { IoIosArrowBack } from 'react-icons/io';
import './PaymentModal.css'
import { useState } from 'react';

const PaymentModal = () => {
    const [modalOpen, setModalOpen] = useState(true)
    return (
        <main>
            {modalOpen && (
                <div className="flex items-center justify-center fixed top-0 left-0 w-screen h-screen bg-zinc-950 bg-opacity-50 modal-background">
                    <div className="bg-slate-50 lg:w-[35%] lg:h-[70%] rounded-xl p-4 flex flex-col justify-between sm:w-[75%] sm:h-[75%]">
                        <div>
                            <div>
                                <button onClick={() => setModalOpen(false)}>
                                    <IoIosArrowBack size={28} />
                                </button>
                            </div>
                            <div className="m-2 my-6 text-[32px]">Enter the donation amount:</div>
                            <div>
                                <input
                                    placeholder='$0'
                                    type="text"
                                    className="bg-slate-50 text-black text-[30px] w-full border-none focus:outline-none focus:ring-0 custom-border-bottom"
                                />
                                <hr className="w-full border-gray-400 border-solid border" />
                            </div>
                            <div className='mt-3 md:mt-0'>
                                <label className='text-[13px]'>Add 2% for charity?</label>
                                <input type="checkbox" name="charity" id="charity" className="ml-4 charity-checkbox text-theme" defaultChecked />
                            </div>
                        </div>
                        <div className='flex justify-end mt-10 md:mt-auto'>
                            <button className='bg-zinc-950 rounded-md w-full p-2 text-white text-[15px]'>Pay now</button>
                        </div>
                    </div>
                </div>
            )}

        </main>

    )
}

export default PaymentModal