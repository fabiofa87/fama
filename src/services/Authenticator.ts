import * as jwt from 'jsonwebtoken'
import {config} from 'dotenv'


config();

export interface AuthenticationData {
    id: string,
    role: string
}

export class Authenticator {
    generateToken(input: AuthenticationData): string {
        return jwt.sign(
            input,
            process.env.JWT_KEY!,
            {
                expiresIn: process.env.JWT_EXPIRES_IN!
            }
        )
    }
    getTokenData(token: string): AuthenticationData {
        const input = jwt.verify(token, process.env.JWT_KEY!) as AuthenticationData
        return input
    }
}