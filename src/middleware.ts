import { NextRequest, NextResponse } from 'next/server'
import {getSession} from "./services/auth/session-cookie"

// 1. Specify protected and public routes
const protectedRoutes = ['/admin']
const publicRoutes = ['/login', '/registration', '/createAccount']
 
export default async function middleware(req: NextRequest) {
    // 2. Check if the current route is protected or public
    const path = req.nextUrl.pathname
    const isProtectedRoute = protectedRoutes.includes(path)
    const isPublicRoute = publicRoutes.includes(path)

    console.log("path", path)

    let cookie;
    let jwt;
    let usertype;
    try{
        cookie = req.cookies.get('Auth_Sessionx');
        if(cookie){
            jwt = cookie.value
            usertype = await getSession(jwt);
        }

        if(usertype != null){
            console.log("auth cookie was valid!")
        }

    } catch{
        console.log("error with auth cookie");
        return;
    }

    if(usertype != 'admin' && isProtectedRoute){
        console.log("user trying to access admin route")
        return NextResponse.redirect(new URL('/', req.nextUrl))
    }

    if(usertype == 'admin' && isProtectedRoute){
        return NextResponse.redirect(new URL(path, req.nextUrl))

    }

//   // 5. Redirect to /login if the user is not authenticated
//   if (isProtectedRoute && !session?.userId) {
//     return NextResponse.redirect(new URL('/login', req.nextUrl))
//   }
 
//   // 6. Redirect to /dashboard if the user is authenticated
//   if (
//     isPublicRoute &&
//     session?.userId &&
//     !req.nextUrl.pathname.startsWith('/dashboard')
//   ) {
//     return NextResponse.redirect(new URL('/dashboard', req.nextUrl))
//   }
 
  return NextResponse.next()
}
 
// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
	