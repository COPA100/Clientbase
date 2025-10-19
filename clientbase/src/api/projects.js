import { supabase } from "../supabaseClient";

export async function getProjects() {
	const { data, error } = await supabase
		.from("projects")
		.select("*")
		.order("created_at", { ascending: false });
	if (error) {
		throw error;
	}
	return data;
}

export async function getProjectsByClient(clientId) {
	const { data, error } = await supabase
		.from("projects")
		.select("*")
		.eq("client_id", clientId)
		.order("created_at", { ascending: false });
	if (error) {
		throw error;
	}
	return data;
}

export async function addProject(project) {
	const user = (await supabase.auth.getUser()).data.user;
	const { data, error } = await supabase
		.from("projects")
		.insert([{ ...project, user_id: user.id }]);
	if (error) {
		throw error;
	}
	return data;
}

export async function updateProject(id, updates) {
	const { data, error } = await supabase
		.from("projects")
		.update(updates)
		.eq("id", id);
	if (error) {
		throw error;
	}
	return data;
}

export async function deleteProject(id) {
	const { error } = await supabase.from("projects").delete().eq("id", id);
	if (error) {
		throw error;
	}
}
