import Navbar from "../components/Navbar";
import DashboardCards from "../components/DashboardCards";
import ClientList from "../components/ClientList";
import ProjectList from "../components/ProjectList";
import InvoiceList from "../components/InvoiceList";

export default function Dashboard() {
    return (
        <>
            <div className="bg-background min-h-screen w-full">
                <Navbar />
                <div className="max-w-7xl mx-auto pt-30 px-6 py-8">
                    <h1 className="text-4xl font-bold text-text mb-8">
                        Dashboard
                    </h1>

                    <DashboardCards />

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="bg-white rounded-lg shadow-md overflow-hidden">
                            <div className="bg-primary px-5 py-3">
                                <h2 className="text-xl font-semibold text-white">
                                    Recent Clients
                                </h2>
                            </div>
                            <div className="max-h-96 overflow-y-auto">
                                <ClientList />
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-md overflow-hidden">
                            <div className="bg-secondary px-5 py-3">
                                <h2 className="text-xl font-semibold text-white">
                                    Recent Projects
                                </h2>
                            </div>
                            <div className="max-h-96 overflow-y-auto">
                                <ProjectList />
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-md overflow-hidden">
                            <div className="bg-blue-600 px-5 py-3">
                                <h2 className="text-xl font-semibold text-white">
                                    Recent Invoices
                                </h2>
                            </div>
                            <div className="max-h-96 overflow-y-auto">
                                <InvoiceList />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
