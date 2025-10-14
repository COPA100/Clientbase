import { Link } from "react-router-dom";
import navLinks from "../data/navLinks";
import { supabase } from "../supabaseClient";

export default function Navbar() {
    const handleLogout = async () => {
        await supabase.auth.signOut();
    };

    return (
        <>
            <div className="fixed left-0 top-0 w-full h-14 bg-primary shadow-md z-40">
                <div className="flex justify-between items-center h-full px-8">
                    <ul className="flex items-center gap-8 text-white font-semibold">
                        <li>
                            <svg
                                width="32"
                                height="32"
                                viewBox="16 20 32 28"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <line
                                    x1="20"
                                    y1="24"
                                    x2="32"
                                    y2="44"
                                    stroke="#ffffff"
                                    strokeWidth="2"
                                />
                                <line
                                    x1="44"
                                    y1="24"
                                    x2="32"
                                    y2="44"
                                    stroke="#ffffff"
                                    strokeWidth="2"
                                />
                                <line
                                    x1="20"
                                    y1="24"
                                    x2="44"
                                    y2="24"
                                    stroke="#ffffff"
                                    strokeWidth="2"
                                />
                                <circle cx="20" cy="24" r="4" fill="#10B981" />
                                <circle cx="44" cy="24" r="4" fill="#10B981" />
                                <circle cx="32" cy="44" r="4" fill="#10B981" />
                            </svg>
                        </li>
                        {navLinks.map((link) => (
                            <li key={link.id}>
                                <Link
                                    to={link.link}
                                    className="hover:text-emerald-400 cursor-pointer transition"
                                >
                                    {link.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <button
                        onClick={handleLogout}
                        className="text-white font-semibold bg-slate-800 px-3 py-1 rounded-lg hover:text-emerald-400 cursor-pointer transition"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </>
    );
}
