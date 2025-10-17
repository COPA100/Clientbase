import { supabase } from "../supabaseClient";

export async function getClients() {
    const { data, error } = await supabase
        .from("clients")
        .select("*")
        .order("created_at", { ascending: false });
    if (error) {
        throw error;
    }
    return data;
}

export async function addClient(client) {
    const user = (await supabase.auth.getUser()).data.user;
    const { data, error } = await supabase
        .from("clients")
        .insert([{ ...client, user_id: user.id }]);
    if (error) {
        throw error;
    }
    return data;
}

export async function updateClient(id, updates) {
    const { data, error } = await supabase
        .from("clients")
        .update(updates)
        .eq("id", id);
    if (error) {
        throw error;
    }
    return data;
}

export async function deleteClient(id) {
    const { error } = await supabase.from("clients").delete().eq("id", id);
    if (error) {
        throw error;
    }
}
