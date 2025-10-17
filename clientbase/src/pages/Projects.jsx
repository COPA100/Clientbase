import { useState } from "react";
import Navbar from "../components/Navbar";
import ProjectList from "../components/ProjectList";
import ProjectForm from "../components/ProjectForm";

export default function Projects() {
    const [form, setForm] = useState(false);

    return (
        <>
            <div className="bg-background min-h-screen w-full">
                <Navbar></Navbar>

                <ProjectForm
                    open={form}
                    onClose={() => setForm(false)}
                ></ProjectForm>
                <div className="pt-20 px-4 flex flex-col items-center justify-center gap-6">
                    <button
                        onClick={() => setForm(true)}
                        className="bg-emerald-500 text-white text-xl font-semibold rounded-lg px-5 py-2 cursor-pointer hover:scale-[103%] hover:shadow-md transition-all"
                    >
                        Add Project
                    </button>
                    <div className="w-full max-w-[800px] min-w-[300px] overflow-hidden rounded-lg border border-gray-200 shadow-lg">
                        <ProjectList></ProjectList>
                    </div>
                </div>
            </div>
        </>
    );
}
