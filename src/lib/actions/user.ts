'use server'
import { revalidatePath } from "next/cache";
import { serverMutation } from "../core/server";

export const toggleUserBlockAction = async (id: string, isBlocked: boolean) => {
    try {
        const res = await serverMutation(`/api/users/${id}/block`, { isBlocked }, 'PATCH');
        revalidatePath('/dashboard/admin/manage-users'); 
        return { success: true, data: res };
    } catch (error: any) {
        console.error("Toggle Block Action error:", error);
        return { success: false, message: error.message || "Failed to update user status" };
    }
}