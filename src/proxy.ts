import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { auth } from './lib/auth'
import { headers } from 'next/headers'

export async function proxy(request: NextRequest) {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    if (!session) {
        return NextResponse.redirect(new URL('/auth/signin', request.url))
    }
}

export const config = {
    matcher: ['/my-profile', '/success', '/dashboard/:path*'],
}
