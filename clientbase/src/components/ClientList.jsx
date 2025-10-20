import { useState, useEffect } from "react";
import deleteIcon from "../assets/deleteIcon.svg";
import editIcon from "../assets/editIcon.svg";

import { getClients, updateClient, deleteClient } from "../api/clients";

export default function ClientList() {
    const [clientData, setClientData] = useState([]);

    async function handleDelete(id) {
        // prompt for deletion
        const ok = window.confirm("Delete this client?");
        if (!ok) return;
        try {
            await deleteClient(id);
            setClientData((prev) => prev.filter((c) => c.id !== id));
        } catch (e) {
            console.error(e);
            alert("Failed to delete client");
        }
    }

    async function handleEdit(client) {
        const newName = window.prompt("Edit client name", client.name);
        if (newName === null) return; 
        const newNotes = window.prompt(
            "Edit client notes",
            client.notes || ""
        );
        if (newNotes === null) return;
        try {
            await updateClient(client.id, { name: newName, notes: newNotes });
            setClientData((prev) =>
                prev.map((c) =>
                    c.id === client.id ? { ...c, name: newName, notes: newNotes } : c
                )
            );
        } catch (e) {
            console.error(e);
            alert("Failed to update client");
        }
    }

    useEffect(() => {
        async function load() {
            const data = await getClients();
            setClientData(data);
        }

        load();
    }, []);

    return (
        <>
            {clientData.length === 0 && (
                <div className="w-full font-montserrat bg-white px-5 py-3 flex justify-center items-center gap-4">
                    <h1 className="py-1">No clients yet...</h1>
                </div>
            )}
            {clientData.map((client, index) => (
                <div key={client.id}>
                    <div className="w-full font-montserrat bg-white px-5 py-3 flex justify-between items-center gap-4">
                        <div className="flex flex-col gap-1 flex-1 min-w-0">
                            <h1 className="text-xl text-text font-semibold">
                                {client.name}
                            </h1>
                            <p>{client.notes}</p>
                        </div>
                        <div className="flex gap-4 flex-shrink-0">
                            <button
                                onClick={() => handleEdit(client)}
                                className="bg-secondary px-2 py-2 rounded-lg text-white font-semibold cursor-pointer hover:bg-secondary-hover hover:shadow-lg transition-all duration-200"
                            >
                                <img
                                    src={editIcon}
                                    className="brightness-0 invert w-5 h-5"
                                ></img>
                            </button>
                            <button
                                onClick={() => handleDelete(client.id)}
                                className="bg-red-500 px-2 py-2 rounded-lg text-white font-semibold cursor-pointer hover:bg-red-600 hover:shadow-lg transition-all duration-200"
                            >
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
