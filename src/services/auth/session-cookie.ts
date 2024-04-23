const jose = require('jose')

const jwtConfig = {
    secret: new TextEncoder().encode(process.env.JWT_SECRET),
  }
  

export async function getSession(token: any){
    //console.log("token: ", token);
    try {
        const { payload, protectedHeader } = await jose.jwtVerify(token, jwtConfig.secret); // decrypt the token
        //console.log("payload: ", payload.payload.user.userType);
        return payload.payload.user.userType;

    } catch (error) {
        // If verification fails (e.g., invalid signature or expired token), an error will be thrown
        console.error('Error verifying token:', error);
        return null; // Return null or handle the error appropriately
    }
}
