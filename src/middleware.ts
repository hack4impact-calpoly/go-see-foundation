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
        cookie = req.cookies.get('Auth_Session');
        if(cookie){
            jwt = cookie.value
            usertype = await getSession(jwt);
        }

        if(usertype != null){
            console.log("auth cookie was valid!");
        } else {
            console.log("invalid / null cookie");
        }

    } catch{
        console.log("error with auth cookie");
        return;
    }

    console.log('role: ', usertype);
    if(usertype != 'admin' && isProtectedRoute){
        console.log("user trying to access admin route")
        
        return NextResponse.redirect(new URL('/', req.nextUrl))
    }

  return NextResponse.next()
}
 
// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
	