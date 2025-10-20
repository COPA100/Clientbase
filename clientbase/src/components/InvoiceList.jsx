import { useEffect, useState } from "react";
import deleteIcon from "../assets/deleteIcon.svg";
import editIcon from "../assets/editIcon.svg";

import { getInvoices, updateInvoice, deleteInvoice } from "../api/invoices";
import { getClients } from "../api/clients";
import { getProjects } from "../api/projects";

export default function InvoiceList() {
    const [invoiceData, setInvoiceData] = useState([]);
    const [clients, setClients] = useState([]);
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function load() {
            try {
                setLoading(true);
                const [invoices, cl, pr] = await Promise.all([
                    getInvoices(),
                    getClients(),
                    getProjects(),
                ]);
                setInvoiceData(invoices || []);
                setClients(cl || []);
                setProjects(pr || []);
            } catch (e) {
                console.error(e);
                alert(`Failed to load invoices: ${e?.message || e}`);
            } finally {
                setLoading(false);
            }
        }
        load();
    }, []);

    async function handleDelete(id) {
        const ok = window.confirm("Delete this invoice?");
        if (!ok) return;
        try {
            await deleteInvoice(id);
            setInvoiceData((prev) => prev.filter((c) => c.id !== id));
        } catch (e) {
            console.error(e);
            alert(`Failed to delete invoice: ${e?.message || e}`);
        }
    }

    async function handleEdit(invoice) {
        const existingPrice =
            invoice.price !== undefined ? invoice.price : invoice.amount;
        const newPrice = window.prompt(
            "Edit price:",
            String(existingPrice ?? "")
        );
        if (newPrice === null) return;
        const parsedPrice =
            newPrice.trim() === "" ? existingPrice : Number(newPrice);

        const newNotes = window.prompt("Edit notes:", invoice.notes || "");
        if (newNotes === null) return;
        const notes = newNotes.trim();

        const currentDate = invoice.due_date
            ? String(invoice.due_date).slice(0, 10)
            : "";
        const newDate = window.prompt(
            "Edit due date (YYYY-MM-DD):",
            currentDate
        );
        if (newDate === null) return;
        const due_date = newDate.trim() === "" ? null : newDate.trim();

        const derivedStatus =
            invoice.status || (invoice.paid ? "Paid" : "Not Paid");
        const newStatus = window.prompt(
            "Edit status (Not Paid, Paid, Overdue):",
            derivedStatus || "Not Paid"
        );
        if (newStatus === null) return;
        const allowed = ["Not Paid", "Paid", "Overdue"];
        const status = allowed.includes(newStatus.trim())
            ? newStatus.trim()
            : derivedStatus || "Not Paid";

        try {
            const updates = {
                notes,
                due_date,
            };
            if (invoice.price !== undefined || invoice.status !== undefined) {
                updates.price = parsedPrice;
                updates.status = status;
            } else {
                updates.amount = parsedPrice;
                updates.paid = status === "Paid";
            }

            await updateInvoice(invoice.id, updates);
            setInvoiceData((prev) =>
                prev.map((i) =>
                    i.id === invoice.id
                        ? { ...i, ...updates }
                        : i
                )
            );
        } catch (e) {
            console.error(e);
            alert(`Failed to update invoice: ${e?.message || e}`);
        }
    }

    return (
        <>
            {loading ? (
                <div className="w-full font-montserrat bg-white px-5 py-4 text-center">
                    Loading invoices...
                </div>
            ) : invoiceData.length === 0 ? (
                <div className="w-full font-montserrat bg-white px-5 py-4 text-center">
                    No invoices yet.
                </div>
            ) : (
                invoiceData.map((inv, idx) => {
                    const dateStr = inv.due_date || inv.created_at;
                    const dateDisplay = dateStr
                        ? new Date(dateStr).toLocaleDateString()
                        : "";
                    const project = projects.find((p) => p.id === inv.project_id);
                    const projectName = project?.name || "";
                    const clientName = project ? (clients.find((c) => c.id === project.client_id) || {}).name || "—" : "—";
                    const baseStatus = inv.status || (inv.paid ? "Paid" : "Not Paid");
                    const isOverdue =
                        baseStatus !== "Paid" && inv.due_date && new Date(inv.due_date) < new Date();
                    const statusText = isOverdue ? "Overdue" : baseStatus || "Not Paid";
                    const statusBg =
                        statusText === "Paid"
                            ? "bg-green-300"
                            : statusText === "Overdue"
                            ? "bg-red-300"
                            : "bg-yellow-300";
                    const price = inv.price ?? inv.amount ?? 0;
                    return (
                        <div key={inv.id || idx}>
                            {/* list item */}
                            <div className="w-full font-montserrat bg-white px-5 py-3 flex justify-between items-center gap-4">
                                <div className="flex flex-col gap-1">
                                    <p>{dateDisplay}</p>
                                    <h1 className="text-xl text-text font-semibold">
                                        ${price}
                                    </h1>
                                    <p className="font-semibold text-lg">
                                        {clientName}
                                        {projectName ? (
                                            <>
                                                {" "}
                                                —{" "}
                                                <span className="font-normal">
                                                    {projectName}
                                                </span>
                                            </>
                                        ) : null}
                                    </p>
                                    {inv.notes ? <p>{inv.notes}</p> : null}
                                    <p
                                        className={`${statusBg} w-fit rounded-lg px-3 py-1 font-semibold`}
                                    >
                                        {statusText}
                                    </p>
                                </div>
                                <div className="flex gap-4">
                                    <button
                                        onClick={() => handleEdit(inv)}
                                        className="bg-secondary px-2 py-2 rounded-lg text-white font-semibold cursor-pointer hover:bg-secondary-hover hover:shadow-lg transition-all duration-200"
                                    >
                                        <img
                                            src={editIcon}
                                            className="brightness-0 invert w-5 h-5"
                                        />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(inv.id)}
                                        className="bg-red-500 px-2 py-2 rounded-lg text-white font-semibold cursor-pointer hover:bg-red-600 hover:shadow-lg transition-all duration-200"
                                    >
                                        <img
                                            src={deleteIcon}
                                            className="brightness-0 invert w-5 h-5"
                                        />
                                    </button>
                                </div>
                            </div>
                            {/* line separator */}
                            <div className="flex justify-center bg-white">
                                <div className="h-[1px] w-[90%] bg-gray-200"></div>
                            </div>
                        </div>
                    );
                })
            )}
        </>
    );
}
