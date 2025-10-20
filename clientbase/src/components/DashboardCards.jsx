import { useEffect, useState } from "react";
import { getClients } from "../api/clients";
import { getProjects } from "../api/projects";
import { getInvoices } from "../api/invoices";

export default function DashboardCards() {
    const [stats, setStats] = useState({
        totalClients: 0,
        activeProjects: 0,
        totalInvoices: 0,
        unpaidInvoices: 0,
    });

    useEffect(() => {
        async function loadStats() {
            try {
                const [clients, projects, invoices] = await Promise.all([
                    getClients(),
                    getProjects(),
                    getInvoices(),
                ]);

                const activeProjects = projects.filter(
                    (p) => p.status === "Active" || !p.status
                ).length;

                const unpaidInvoices = invoices.filter((inv) => {
                    const status =
                        inv.status || (inv.paid ? "Paid" : "Not Paid");
                    return status !== "Paid";
                }).length;

                setStats({
                    totalClients: clients.length,
                    activeProjects: activeProjects,
                    totalInvoices: invoices.length,
                    unpaidInvoices: unpaidInvoices,
                });
            } catch (e) {
                console.error("Failed to load stats:", e);
            }
        }
        loadStats();
    }, []);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-gray-500 text-sm font-semibold mb-2">
                    Total Clients
                </h3>
                <p className="text-3xl font-bold text-primary">
                    {stats.totalClients}
                </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-gray-500 text-sm font-semibold mb-2">
                    Active Projects
                </h3>
                <p className="text-3xl font-bold text-secondary">
                    {stats.activeProjects}
                </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-gray-500 text-sm font-semibold mb-2">
                    Total Invoices
                </h3>
                <p className="text-3xl font-bold text-blue-600">
                    {stats.totalInvoices}
                </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-gray-500 text-sm font-semibold mb-2">
                    Unpaid Invoices
                </h3>
                <p className="text-3xl font-bold text-red-600">
                    {stats.unpaidInvoices}
                </p>
            </div>
        </div>
    );
}
