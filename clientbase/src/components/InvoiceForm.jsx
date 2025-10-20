import { useEffect, useState } from "react";
import { addInvoice } from "../api/invoices";
import { getClients } from "../api/clients";
import { getProjects, getProjectsByClient } from "../api/projects";

export default function InvoiceForm({ open, onClose }) {
    const [amount, setAmount] = useState("");
    const [notes, setNotes] = useState("");
    // format YYYY-MM-DD
    const [dueDate, setDueDate] = useState(""); 
    
    const [clientId, setClientId] = useState("");
    const [projectId, setProjectId] = useState("");
    const [paid, setPaid] = useState(false);

    const [clients, setClients] = useState([]);
    const [projects, setProjects] = useState([]);
    const [loadingClients, setLoadingClients] = useState(false);
    const [loadingProjects, setLoadingProjects] = useState(false);
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

    useEffect(() => {
        if (!open) return;
        async function loadProjects() {
            setLoadingProjects(true);
            try {
                let data = [];
                if (clientId) {
                    data = await getProjectsByClient(clientId);
                } else {
                    data = await getProjects();
                }
                setProjects(data || []);
            } catch (e) {
                console.error(e);
                alert("Failed to load projects");
            } finally {
                setLoadingProjects(false);
            }
        }
        loadProjects();
    }, [open, clientId]);

    async function handleSubmit() {
        if (!amount) return;
        if (!projectId) return;
        const num = parseFloat(amount);
        if (Number.isNaN(num)) {
            alert("Amount must be a number");
            return;
        }
        try {
            setSubmitting(true);
            await addInvoice({
                amount: num,
                notes: notes.trim() || null,
                due_date: dueDate || null,
                project_id: Number(projectId),
                paid,
            });

            setAmount("");
            setNotes("");
            setDueDate("");
            setClientId("");
            setProjectId("");
            setPaid(false);

            window.location.reload();
        } catch (e) {
            console.error(e);
            alert(`Failed to add invoice: ${e?.message || e}`);
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
                                Add Invoice
                            </h1>
                        </div>
                        <div className="flex flex-col gap-2 px-6 py-3">
                            <p className="">Amount</p>
                            <input
                                type="number"
                                step="0.01"
                                inputMode="decimal"
                                placeholder="Total amount of invoice"
                                className="w-full px-3 py-1 outline-1 outline-gray-200 rounded-lg"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                            />
                            <p className="">Notes</p>
                            <input
                                type="text"
                                placeholder="Invoice notes"
                                className="w-full px-3 py-1 outline-1 outline-gray-200 rounded-lg"
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                            />
                            <p>Due Date</p>
                            <input
                                type="date"
                                className="px-3 py-1 outline-1 outline-gray-200 rounded-lg"
                                value={dueDate}
                                onChange={(e) => setDueDate(e.target.value)}
                            />
                            <p>Client</p>
                            <select
                                className="w-full px-3 py-1 outline-1 outline-gray-200 rounded-lg bg-white"
                                value={clientId}
                                onChange={(e) => {
                                    setClientId(e.target.value);
                                    setProjectId("");
                                }}
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
                            <p>Project</p>
                            <select
                                className="w-full px-3 py-1 outline-1 outline-gray-200 rounded-lg bg-white"
                                value={projectId}
                                onChange={(e) => setProjectId(e.target.value)}
                                disabled={loadingProjects}
                            >
                                <option value="">
                                    {loadingProjects
                                        ? "Loading projects..."
                                        : clientId
                                        ? "Select a project"
                                        : "Select a client first (optional)"}
                                </option>
                                {!loadingProjects &&
                                    projects.map((p) => (
                                        <option key={p.id} value={p.id}>
                                            {p.name}
                                        </option>
                                    ))}
                            </select>
                            <div className="flex items-center gap-2 pt-1">
                                <input
                                    id="paid"
                                    type="checkbox"
                                    checked={paid}
                                    onChange={(e) => setPaid(e.target.checked)}
                                />
                                <label htmlFor="paid">Paid</label>
                            </div>
                        </div>
                        <div className="flex w-full justify-end gap-3 pt-1 pr-6 pb-3 font-semibold">
                            <button
                                onClick={handleSubmit}
                                disabled={submitting || !amount || !projectId}
                                className={`bg-emerald-500 hover:bg-emerald-600 text-white px-3 py-1 rounded-lg cursor-pointer ${
                                    submitting || !amount || !projectId
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
