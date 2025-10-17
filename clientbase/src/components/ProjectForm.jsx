import { useState } from "react";

export default function ProjectForm({ open, onClose }) {
    return (
        <>
            {open && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg border-emerald-500 border-2 w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl h-auto">
                        <div className="w-full h-12 bg-emerald-500 flex items-center pl-3">
                            <h1 className="text-white text-xl font-semibold">
                                Add Project
                            </h1>
                        </div>
                        <div className="flex flex-col gap-2 px-6 py-3">
                            <p className="">Name</p>
                            <input
                                type="text"
                                placeholder="Name of project"
                                className="w-full px-3 py-1 outline-1 outline-gray-200 rounded-lg"
                            ></input>
                            <p>Deadline</p>
                            <input
                                type="date"
                                className="px-3 py-1 outline-1 outline-gray-200 rounded-lg"
                            ></input>
                            <p>Client</p>
                            <p>DROPDOWN MENU HERE TO PICK CLIENT</p>
                            <p>Status</p>
                            <p>DROPDOWN MENU HERE TO PICK STATUS</p>
                        </div>
                        <div className="flex w-full justify-end gap-3 pt-1 pr-6 pb-3 font-semibold">
                            <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-3 py-1 rounded-lg cursor-pointer">
                                Add
                            </button>
                            <button
                                onClick={onClose}
                                className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded-lg cursor-pointer"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
