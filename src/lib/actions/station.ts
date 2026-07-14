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