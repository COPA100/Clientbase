import { useState } from "react";
import ClientList from "../components/ClientList";
import ClientForm from "../components/ClientForm";
import Navbar from "../components/Navbar";

export default function Clients() {
    const [form, setForm] = useState(false);
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    const handleClientAdded = () => {
        setForm(false);
        setRefreshTrigger(old => old + 1);
    };

    return (
        <>
            <div className="bg-background min-h-screen w-full">
                <Navbar></Navbar>
                <ClientForm
                    open={form}
                    onClose={() => setForm(false)}
                    onSuccess={handleClientAdded}
                ></ClientForm>
                <div className="pt-20 px-4 flex flex-col items-center justify-center gap-6">
                    <button
                        onClick={() => setForm(true)}
                        className="bg-emerald-500 text-white text-xl font-semibold rounded-lg px-5 py-2 cursor-pointer hover:scale-[103%] hover:shadow-md transition-all"
                    >
                        Add Client
                    </button>
                    <div className="w-full max-w-[800px] min-w-[300px] overflow-hidden rounded-lg border border-gray-200 shadow-lg">
                        <ClientList refreshTrigger={refreshTrigger}></ClientList>
                    </div>
                </div>
            </div>
        </>
    );
}
