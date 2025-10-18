import { useState, useEffect } from "react";
import deleteIcon from "../assets/deleteIcon.svg";
import editIcon from "../assets/editIcon.svg";

import { getClients, updateClient, deleteClient } from "../api/clients";

export default function ClientList() {
    const [clientData, setClientData] = useState([]);

    useEffect(() => {
        async function load() {
            const data = await getClients();
            setClientData(data);
        }

        load();
    }, []);

    return (
        <>
            {clientData.map((client, index) => (
                <div key={client.id}>
                    <div className="w-full font-montserrat bg-white px-5 py-3 flex justify-between items-center gap-4">
                        <div className="flex flex-col gap-1">
                            <h1 className="text-xl text-text font-semibold">
                                {client.name}
                            </h1>
                            <p>{client.notes}</p>
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

                    {index <= clientData.length - 1 && (
                        <div className="flex justify-center bg-white">
                            <div className="h-[1px] w-[90%] bg-gray-200"></div>
                        </div>
                    )}
                </div>
            ))}
        </>
    );
}
