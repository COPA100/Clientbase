import "./index.css";
import { useState, useEffect } from "react";
// Supabase client is centralized and configured via Vite env vars in ./lib/supabaseClient
import { supabase } from "./supabaseClient";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

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
            <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />
        );
    } else {
        return <div>Logged in!</div>;
    }
}
