const jose = require('jose')

const jwtConfig = {
    secret: new TextEncoder().encode(process.env.JWT_SECRET),
  }
  

export async function getSession(token: any){
    // const cookie = req.cookies.get('auth_session')
    console.log("token: ", token);

    let decoded;
    try {
        // decrypt the token
        const { payload, protectedHeader } = await jose.jwtVerify(token, jwtConfig.secret);

    } catch (error) {
        // If verification fails (e.g., invalid signature or expired token), an error will be thrown
        console.error('Error verifying token:', error);

        return null; // Return null or handle the error appropriately
    }

    console.log("decoded: ", decoded);
    console.log("success IN THE GET SESSION CALL");
}
