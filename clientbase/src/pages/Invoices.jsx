import { useState } from "react";
import Navbar from "../components/Navbar";
import InvoiceForm from "../components/InvoiceForm";
import InvoiceList from "../components/InvoiceList";

export default function Invoices() {
    const [form, setForm] = useState(false);

    return (
        <>
            <div className="bg-background min-h-screen w-full">
                <Navbar></Navbar>

                <InvoiceForm
                    open={form}
                    onClose={() => setForm(false)}
                ></InvoiceForm>
                <div className="pt-20 px-4 flex flex-col items-center justify-center gap-6">
                    <button
                        onClick={() => setForm(true)}
                        className="bg-emerald-500 text-white text-xl font-semibold rounded-lg px-5 py-2 cursor-pointer hover:scale-[103%] hover:shadow-md transition-all"
                    >
                        Add Invoice
                    </button>
                    <div className="w-full max-w-[800px] min-w-[300px] overflow-hidden rounded-lg border border-gray-200 shadow-lg">
                        <InvoiceList></InvoiceList>
                    </div>
                </div>
            </div>
        </>
    );
}
