'use server'

import { revalidatePath } from "next/cache";
import { serverMutation } from "../core/server";
import { StationInput } from "@/types";



export const createStationAction = async (data: StationInput) => {
    try {
        const res = await serverMutation('/api/stations', data, 'POST');
        
        revalidatePath('/dashboard/fleet'); 
        revalidatePath('/stations');

        return { success: true, data: res };
    } catch (error: any) {
        console.error("Action error:", error);
        return { success: false, message: error.message || "Failed to create station" };
    }
}

export const updateStationAction = async (id: string, data: Partial<StationInput>) => {
    try {
        const res = await serverMutation(`/api/stations/${id}`, data, 'PUT');
        
        revalidatePath('/dashboard/manage-stations'); 
        revalidatePath('/stations');

        return { success: true, data: res };
    } catch (error: any) {
        console.error("Update Action error:", error);
        return { success: false, message: error.message || "Failed to update station" };
    }
}

export const deleteStationAction = async (id: string) => {
    try {
        const res = await serverMutation(`/api/stations/${id}`, {}, 'DELETE');
        
        revalidatePath('/dashboard/manage-stations'); 
        revalidatePath('/stations');

        return { success: true, data: res };
    } catch (error: any) {
        console.error("Delete Action error:", error);
        return { success: false, message: error.message || "Failed to delete station" };
    }
}