import "./index.css";
import { useState, useEffect } from "react";
// Supabase client is centralized and configured via Vite env vars in ./lib/supabaseClient
import { supabase } from "./supabaseClient";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Clients from "./pages/Clients";
import Projects from "./pages/Projects";
import Invoices from "./pages/Invoices";
import NotFoundPage from "./pages/NotFoundPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Dashboard />,
        errorElement: <NotFoundPage />,
    },
    {
        path: "/clients",
        element: <Clients />,
        errorElement: <NotFoundPage />,
    },
    {
        path: "/projects",
        element: <Projects />,
        errorElement: <NotFoundPage />,
    },
    {
        path: "/invoices",
        element: <Invoices />,
        errorElement: <NotFoundPage />,
    },
]);

export default function App() {
    const [session, setSession] = useState(null);

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
        });

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        return () => subscription.unsubscribe();
    }, []);

    if (!session) {
        return (
            <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
                <div className="w-full max-w-md mx-4">
                    <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-200">
                        <div className="mb-4 text-center">
                            <h1 className="text-3xl font-bold text-slate-900">
                                Clientbase
                            </h1>
                            <p className="text-slate-600 mt-2">
                                Manage your clients professionally
                            </p>
                        </div>
                        <Auth
                            supabaseClient={supabase}
                            appearance={{
                                theme: ThemeSupa,
                            }}
                            providers={[]}
                        />
                    </div>
                </div>
            </div>
        );
    } else {
        return <RouterProvider router={router} />;
    }
}
