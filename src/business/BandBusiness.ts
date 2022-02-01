import { BandDatabase } from "../data/BandDatabase";
import { Band, BandInputDTO } from "../entities/Band";
import { UserRole } from "../entities/User";
import { AuthenticationData, Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";

export class BandBusiness { 
    constructor(
            private bandDatabase: BandDatabase,
            private idGenerator: IdGenerator,
            private authenticator: Authenticator
    ) {}

    async addBand(input: BandInputDTO, token: string) {
        try {

            const tokenData = this.authenticator.getTokenData(token);
            if(tokenData.role !== UserRole.ADMIN) {
                throw new Error("You do not have permission to perform this action!");
            }

            if(!input.name || !input.music_genre || !input.responsible) {
                throw new Error("Invalid input!");
            }

            await this.bandDatabase.addBand(
                Band.toBandModel({
                    ...input,
                    id: this.idGenerator.generate()
                })!
            )
        }
        catch(error: any) {
            throw new Error(error.sqlMessage || error.message);
        }
    }
}