import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./services/auth/cookietoUsertype";

//    protected and public routes
const protectedRoutes = ["/admin"];
const publicRoutes = ["/login", "/registration", "/createAccount"];

export default async function middleware(req: NextRequest) {
    //    Check if the current route is protected or public
    const path = req.nextUrl.pathname;
    const isProtectedRoute = protectedRoutes.includes(path);
    const isPublicRoute = publicRoutes.includes(path);

    console.log("path", path);

    const usertype = await getSession(req);

    if (usertype === null && isProtectedRoute) {
        console.log("null");
        // return res.status(401).json({ message: 'Token has expired' });

        return NextResponse.redirect(new URL("/login", req.nextUrl));
    }

    if (usertype != "admin" && isProtectedRoute) {
        return NextResponse.redirect(new URL("/", req.nextUrl));
    }

    return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
    matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
