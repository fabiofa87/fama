import {User, UserRole, toUserModel, SignupInputDTO} from "../src/entities/User";
import {NOTFOUND} from "dns";
import {UserBusiness} from "../src/business/UserBusiness";

const userDatabase = {
    createUser: jest.fn(async (user: User) => {}),
    getUserByEmail: jest.fn((email: string) => {
        if(email === "teste@gmail.com") {
            return toUserModel({
                id: "id",
                name: "name",
                email: email,
                password: "12345",
                UserRole: UserRole.ADMIN
            })
        } else {
            throw new Error(`Unable to find user with ${email}.`)
        }
    })
}
const authenticator = {
    generateToken: jest.fn((payload: {id: string, role: UserRole}) => "token_teste"),
    getData: jest.fn((token: string) => {

            switch(token) {
                case "userToken":
                    return {id: "id token", role: "NORMAL"}
                case "adminToken":
                    return {id: "id token", role: "ADMIN"}
                default:
                    return undefined
            }
    })
}
const idGenerator = {
    generate: jest.fn(() => "test id backend")
}
const hashManager = {
    hash: jest.fn((password: string) => "secret hash"),
    compareHash: jest.fn((str: string, hash: string) => str === "123123" ? true : false)
}

const userBusiness = new UserBusiness(
    userDatabase as any,
    idGenerator as any,
    hashManager as any,
    authenticator as any
)

describe("Signup Test Flow", ()=> {
    test("Should return error when wrong email format", async () => {
        const user = {
            email: "emailtestegmail.com",
            name: "fabio testando",
            password: "12345",
            role: "normal"
        } as SignupInputDTO

        try {
            await userBusiness.createUser(user)
        }
        catch (error: any) {
            expect(error.message).toBe("Invalid email format")
            expect(error.code).toBe(417)
        }
    })
})
