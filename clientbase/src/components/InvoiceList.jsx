import { useState } from "react";
import deleteIcon from "../assets/deleteIcon.svg";
import editIcon from "../assets/editIcon.svg";

export default function InvoiceList() {
    return (
        <>
            {/* list item */}
            <div className="w-full font-montserrat bg-white px-5 py-3 flex justify-between items-center gap-4">
                <div className="flex flex-col gap-1">
                    <p>01/21/2026</p>
                    <h1 className="text-xl text-text font-semibold">$130.00</h1>
                    <p className="font-semibold text-lg">
                        Acme Marketing Co. —{" "}
                        <span className="font-normal">Booking Portal MVP</span>
                    </p>
                    <p>Final payment for redesign.</p>
                    <p className="bg-green-300 w-fit rounded-lg px-3 py-1 font-semibold">
                        Paid
                    </p>
                </div>
                <div className="flex gap-4">
                    <button className="bg-secondary px-2 py-2 rounded-lg text-white font-semibold cursor-pointer hover:bg-secondary-hover hover:shadow-lg transition-all duration-200">
                        <img
                            src={editIcon}
                            className="brightness-0 invert w-5 h-5"
                        ></img>
                    </button>
                    <button className="bg-red-500 px-2 py-2 rounded-lg text-white font-semibold cursor-pointer hover:bg-red-600 hover:shadow-lg transition-all duration-200">
                        <img
                            src={deleteIcon}
                            className="brightness-0 invert w-5 h-5"
                        ></img>
                    </button>
                </div>
            </div>
            {/* line seperator */}
            <div className="flex justify-center bg-white">
                <div className="h-[1px] w-[90%] bg-gray-200"></div>
            </div>
            {/* list item */}
            <div className="w-full font-montserrat bg-white px-5 py-3 flex justify-between items-center gap-4">
                <div className="flex flex-col gap-1">
                    <p>04/21/2026</p>
                    <h1 className="text-xl text-text font-semibold">
                        $1100.00
                    </h1>
                    <p className="font-semibold text-lg">
                        Greenleaf Landscaping —{" "}
                        <span className="font-normal">Brand Website</span>
                    </p>
                    <p>Final payment for website.</p>
                    <p className="bg-red-300 w-fit rounded-lg px-3 py-1 font-semibold">
                        Not Paid
                    </p>
                </div>
                <div className="flex gap-4">
                    <button className="bg-secondary px-2 py-2 rounded-lg text-white font-semibold cursor-pointer hover:bg-secondary-hover hover:shadow-lg transition-all duration-200">
                        <img
                            src={editIcon}
                            className="brightness-0 invert w-5 h-5"
                        ></img>
                    </button>
                    <button className="bg-red-500 px-2 py-2 rounded-lg text-white font-semibold cursor-pointer hover:bg-red-600 hover:shadow-lg transition-all duration-200">
                        <img
                            src={deleteIcon}
                            className="brightness-0 invert w-5 h-5"
                        ></img>
                    </button>
                </div>
            </div>
        </>
    );
}
