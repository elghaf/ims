import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    // Protect all these routes
    const protectedPaths = ['/dashboard', '/categories', '/stock-alerts'];
    const isProtectedPath = protectedPaths.some(path => 
        request.nextUrl.pathname.startsWith(path)
    );

    if (isProtectedPath) {
        const token = request.cookies.get('access_token');

        if (!token) {
            return NextResponse.redirect(new URL('/auth/login', request.url));
        }
    }
    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*', '/categories/:path*', '/stock-alerts/:path*']
};
