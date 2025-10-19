import { supabase } from "../supabaseClient";

export async function getInvoices() {
	const { data, error } = await supabase
		.from("invoices")
		.select("*")
		.order("created_at", { ascending: false });
	if (error) {
		throw error;
	}
	return data;
}

export async function addInvoice(invoice) {
	const user = (await supabase.auth.getUser()).data.user;
	const { data, error } = await supabase
		.from("invoices")
		.insert([{ ...invoice, user_id: user.id }]);
	if (error) {
		throw error;
	}
	return data;
}

export async function updateInvoice(id, updates) {
	const { data, error } = await supabase
		.from("invoices")
		.update(updates)
		.eq("id", id);
	if (error) {
		throw error;
	}
	return data;
}

export async function deleteInvoice(id) {
	const { error } = await supabase.from("invoices").delete().eq("id", id);
	if (error) {
		throw error;
	}
}
