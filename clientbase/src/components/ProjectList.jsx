import { useEffect, useState } from "react";
import deleteIcon from "../assets/deleteIcon.svg";
import editIcon from "../assets/editIcon.svg";

import { getProjects, updateProject, deleteProject } from "../api/projects";
import { getClients } from "../api/clients";

export default function ProjectList() {
    const [projectData, setProjectData] = useState([]);
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function load() {
            try {
                setLoading(true);
                const projects = await getProjects();
                const cl = await getClients();
                setProjectData(projects || []);
                setClients(cl || []);
            } catch (e) {
                console.error(e);
                alert("Failed to load projects");
            } finally {
                setLoading(false);
            }
        }
        load();
    }, []);

    async function handleDelete(id) {
        const ok = window.confirm("Delete this project?");
        if (!ok) return;
        try {
            await deleteProject(id);
            setProjectData((prev) => prev.filter((c) => c.id !== id));
        } catch (e) {
            console.error(e);
            alert("Failed to delete project");
        }
    }

    async function handleEdit(project) {
        const newName = window.prompt("Edit project name:", project.name || "");
        if (newName === null) return;
        const name = newName.trim();
        if (!name) return;

        const newDesc = window.prompt(
            "Edit description:",
            project.description || ""
        );
        if (newDesc === null) return;
        const description = newDesc.trim();

        // date format (YYYY-MM-DD)
        const currentDate = project.deadline
            ? String(project.deadline).slice(0, 10)
            : "";
        const newDate = window.prompt(
            "Edit deadline (YYYY-MM-DD):",
            currentDate
        );
        if (newDate === null) return;
        const deadlineInput = newDate.trim();
        const deadline = deadlineInput === "" ? null : deadlineInput;

        const newStatus = window.prompt(
            "Edit status (Active, Completed, On-Hold):",
            project.status || "Active"
        );
        if (newStatus === null) return;
        const allowed = ["Active", "Completed", "On-Hold"];
        const status = allowed.includes(newStatus.trim())
            ? newStatus.trim()
            : project.status || "Active";

        try {
            await updateProject(project.id, {
                name,
                description,
                deadline,
                status,
            });
            setProjectData((prev) =>
                prev.map((p) =>
                    p.id === project.id
                        ? { ...p, name, description, deadline, status }
                        : p
                )
            );
        } catch (e) {
            console.error(e);
            alert("Failed to update project");
        }
    }

    return (
        <>
            {loading ? (
                <div className="w-full font-montserrat bg-white px-5 py-4 text-center">
                    Loading projects...
                </div>
            ) : projectData.length === 0 ? (
                <div className="w-full font-montserrat bg-white px-5 py-4 text-center">
                    No projects yet.
                </div>
            ) : (
                projectData.map((p, idx) => {
                    const dateStr = p.deadline || p.created_at;
                    const dateDisplay = dateStr
                        ? new Date(dateStr).toLocaleDateString()
                        : "";
                    const clientName =
                        (clients.find((c) => c.id === p.client_id) || {})
                            .name || "—";
                    const statusText = p.status || "Active";
                    const statusBg =
                        statusText === "Completed"
                            ? "bg-green-300"
                            : statusText === "On-Hold"
                            ? "bg-red-300"
                            : "bg-yellow-300";
                    return (
                        <div key={p.id || idx}>
                            {/* list item */}
                            <div className="w-full font-montserrat bg-white px-5 py-3 flex justify-between items-center gap-4">
                                <div className="flex flex-col gap-1 flex-1 min-w-0">
                                    <p>{dateDisplay}</p>
                                    <h1 className="text-xl text-text font-semibold">
                                        {p.name}
                                    </h1>
                                    {p.description ? (
                                        <p className="text-sm text-gray-600">
                                            {p.description}
                                        </p>
                                    ) : null}
                                    <p>{clientName}</p>
                                    <p
                                        className={`${statusBg} w-fit rounded-lg px-3 py-1 font-semibold`}
                                    >
                                        {statusText}
                                    </p>
                                </div>
                                <div className="flex gap-4 flex-shrink-0">
                                    <button
                                        onClick={() => handleEdit(p)}
                                        className="bg-secondary px-2 py-2 rounded-lg text-white font-semibold cursor-pointer hover:bg-secondary-hover hover:shadow-lg transition-all duration-200"
                                    >
                                        <img
                                            src={editIcon}
                                            className="brightness-0 invert w-5 h-5"
                                        />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(p.id)}
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
