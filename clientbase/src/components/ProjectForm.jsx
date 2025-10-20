import { useEffect, useState } from "react";
import { addProject } from "../api/projects";
import { getClients } from "../api/clients";

export default function ProjectForm({ open, onClose }) {
    const [name, setName] = useState("");
    // use this format: YYYY-MM-DD
    const [deadline, setDeadline] = useState("");

    const [clientId, setClientId] = useState("");
    const [status, setStatus] = useState("Active");
    const [clients, setClients] = useState([]);
    const [loadingClients, setLoadingClients] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (!open) return;
        async function load() {
            setLoadingClients(true);
            try {
                const data = await getClients();
                setClients(data || []);
            } catch (e) {
                console.error(e);
                alert("Failed to load clients");
            } finally {
                setLoadingClients(false);
            }
        }
        load();
    }, [open]);

    async function handleSubmit() {
        if (!name.trim()) return;
        if (!clientId) return;
        try {
            setSubmitting(true);
            await addProject({
                name: name.trim(),
                deadline: deadline || null,
                client_id: clientId,
                status,
            });
            setName("");
            setDeadline("");
            setClientId("");
            setStatus("Active");

            window.location.reload();
        } catch (e) {
            console.error(e);
            alert("Failed to add project");
        } finally {
            setSubmitting(false);
        }
    }

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
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <p>Deadline</p>
                            <input
                                type="date"
                                className="px-3 py-1 outline-1 outline-gray-200 rounded-lg"
                                value={deadline}
                                onChange={(e) => setDeadline(e.target.value)}
                            />
                            <p>Client</p>
                            <select
                                className="w-full px-3 py-1 outline-1 outline-gray-200 rounded-lg bg-white"
                                value={clientId}
                                onChange={(e) => setClientId(e.target.value)}
                                disabled={loadingClients}
                            >
                                <option value="">
                                    {loadingClients
                                        ? "Loading clients..."
                                        : "Select a client"}
                                </option>
                                {!loadingClients &&
                                    clients.map((c) => (
                                        <option key={c.id} value={c.id}>
                                            {c.name}
                                        </option>
                                    ))}
                            </select>
                            <p>Status</p>
                            <select
                                className="w-full px-3 py-1 outline-1 outline-gray-200 rounded-lg bg-white"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <option value="Active">Active</option>
                                <option value="Completed">Completed</option>
                                <option value="On-Hold">On-Hold</option>
                            </select>
                        </div>
                        <div className="flex w-full justify-end gap-3 pt-1 pr-6 pb-3 font-semibold">
                            <button
                                onClick={handleSubmit}
                                disabled={
                                    submitting || !name.trim() || !clientId
                                }
                                className={`bg-emerald-500 hover:bg-emerald-600 text-white px-3 py-1 rounded-lg cursor-pointer ${
                                    submitting || !name.trim() || !clientId
                                        ? "opacity-60 cursor-not-allowed"
                                        : ""
                                }`}
                            >
                                {submitting ? "Adding..." : "Add"}
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
