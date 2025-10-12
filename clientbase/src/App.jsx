import "./index.css";
import { useState, useEffect } from "react";
// Supabase client is centralized and configured via Vite env vars in ./lib/supabaseClient
import { supabase } from "./supabaseClient";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFoundPage from "./pages/NotFoundPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
        errorElement: <NotFoundPage />,
    },
    {
        path: "/login",
        element: <Login />,
        errorElement: <NotFoundPage />,
    },
    {
        path: "/signup",
        element: <Signup />,
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
            <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
                <div className="w-full max-w-md mx-4">
                    <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-200">
                        <div className="mb-4 text-center">
                            <h1 className="text-3xl font-bold text-gray-900">
                                ClientBase
                            </h1>
                        </div>
                        <Auth
                            supabaseClient={supabase}
                            appearance={{
                                theme: ThemeSupa,
                                variables: {
                                    default: {
                                        colors: {
                                            brand: "#2563eb",
                                            brandAccent: "#1d4ed8",
                                            brandButtonText: "white",
                                            defaultButtonBackground: "#f3f4f6",
                                            defaultButtonBackgroundHover:
                                                "#e5e7eb",
                                            inputBackground: "white",
                                            inputBorder: "#d1d5db",
                                            inputBorderHover: "#9ca3af",
                                            inputBorderFocus: "#2563eb",
                                        },
                                        radii: {
                                            borderRadiusButton: "0.5rem",
                                            buttonBorderRadius: "0.5rem",
                                            inputBorderRadius: "0.5rem",
                                        },
                                        space: {
                                            spaceSmall: "6px",
                                            spaceMedium: "12px",
                                            spaceLarge: "24px",
                                        },
                                    },
                                },
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
