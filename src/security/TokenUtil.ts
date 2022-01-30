import jwt from 'jsonwebtoken'

export class TokenUtil{

    public static generateToken = (claims: any) => {
        return jwt.sign(claims, process.env.TOKEN_SECRET,  {expiresIn: '24h'})
    }
}