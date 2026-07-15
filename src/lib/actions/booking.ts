'use server'

import { revalidatePath } from "next/cache";
import { serverMutation } from "../core/server";

export const createBookingAction = async (data: { stationId: string; startTime: string; duration: number; totalCost: number }) => {
    try {
        const res = await serverMutation('/api/bookings', data, 'POST');
        revalidatePath('/dashboard/bookings'); 
        revalidatePath('/dashboard/history');
        revalidatePath(`/stations/${data.stationId}`);

        return { success: true, data: res };
    } catch (error: any) {
        console.error("Create Booking Action error:", error);
        return { success: false, message: error.message || "Failed to book session" };
    }
}

export const cancelBookingAction = async (bookingId: string, stationId?: string) => {
    try {
        const res = await serverMutation(`/api/bookings/${bookingId}`, {}, 'DELETE');
        
        revalidatePath('/dashboard/bookings'); 
        revalidatePath('/dashboard/history');
        if (stationId) revalidatePath(`/stations/${stationId}`);

        return { success: true, data: res };
    } catch (error: any) {
        console.error("Cancel Booking Action error:", error);
        return { success: false, message: error.message || "Failed to cancel booking" };
    }
}