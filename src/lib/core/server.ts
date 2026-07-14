// আপাতত টোকেন বা সেশনের কাজ বন্ধ রাখা হয়েছে। প্রয়োজন হলে পরে এটি আনকমেন্ট করে নিতে পারবেন।
// import { getToken } from "./session";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || '';

/**
 * Server Fetch Helper
 * @param path - এপিআই এন্ডপয়েন্ট পাথ (যেমন: '/users')
 * @param requireAuth - অথেন্টিকেশন প্রয়োজন কিনা (আপাতত টোকেন লজিক নিষ্ক্রিয়)
 */
export const serverFetch = async <T = any>(
    path: string, 
    requireAuth: boolean = true
): Promise<T> => {
    const headers: Record<string, string> = { 
        'Content-Type': 'application/json' 
    };

    // টোকেন পাঠানোর লজিক আপাতত বন্ধ রাখা হয়েছে
    /*
    if (requireAuth) {
        const token = await getToken();
        if (token) {
            headers['authorization'] = `Bearer ${token}`;
        }
    }
    */

    const res = await fetch(`${baseUrl}${path}`, {
        headers: headers
    });

    if (!res.ok) {
        throw new Error(`Fetch failed with status: ${res.status}`);
    }

    return res.json() as Promise<T>;
};

/**
 * Server Mutation Helper (POST, PUT, PATCH, DELETE)
 * @param path - এপিআই এন্ডপয়েন্ট পাথ
 * @param data - বডিতে পাঠানোর ডেটা
 * @param method - HTTP মেথড (ডিফল্ট: POST)
 */
export const serverMutation = async <T = any, R = any>(
    path: string, 
    data?: T, 
    method: 'POST' | 'PUT' | 'PATCH' | 'DELETE' = 'POST'
): Promise<R> => {
    // টোকেন সংক্রান্ত লজিক আপাতত বন্ধ রাখা হয়েছে
    // const token = await getToken();

    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        // authorization: `Bearer ${token}` // আপাতত নিষ্ক্রিয়
    };

    const res = await fetch(`${baseUrl}${path}`, {
        method: method,
        headers: headers,
        body: data ? JSON.stringify(data) : undefined,
    });

    if (!res.ok) {
        throw new Error(`Mutation failed with status: ${res.status}`);
    }

    return res.json() as Promise<R>;
};