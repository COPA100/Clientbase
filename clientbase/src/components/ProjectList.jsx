import { useState } from "react";
import deleteIcon from "../assets/deleteIcon.svg";
import editIcon from "../assets/editIcon.svg";

export default function ProjectList() {
    return (
        <>
            {/* list item */}
            <div className="w-full font-montserrat bg-white px-5 py-3 flex justify-between items-center gap-4">
                <div className="flex flex-col gap-1">
                    <p>04/21/2026</p>
                    <h1 className="text-xl text-text font-semibold">
                        Brand Website Redesign
                    </h1>
                    <p>Greenleaf Landscaping</p>
                    <p className="bg-green-300 w-fit rounded-lg px-3 py-1 font-semibold">
                        Completed
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
                    <p>05/21/2026</p>
                    <h1 className="text-xl text-text font-semibold">
                        Booking Portal MVP
                    </h1>
                    <p>Acme Marketing Co.</p>
                    <p className="bg-yellow-300 w-fit rounded-lg px-3 py-1 font-semibold">
                        Active
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
                    <p>02/2/2026</p>
                    <h1 className="text-xl text-text font-semibold">
                        Fitness App Dashboard
                    </h1>
                    <p>Nova Fitness Studio.</p>
                    <p className="bg-red-300 w-fit rounded-lg px-3 py-1 font-semibold">
                        On-Hold
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
