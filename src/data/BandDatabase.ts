import { Band } from "../entities/Band";
import { BaseDatabase } from "./BaseDatabase";

export class BandDatabase extends BaseDatabase {
    public async addBand(band: Band): Promise<void> {
        try {
            const result = await this.getConnection()
            .insert({
                id: band.getId(),
                name: band.getName(),
                music_genre: band.getMusicGenre(),
                responsible: band.getResponsible(),
            })
            .into('bandas')
            
        }
        catch(error: any) {
            throw new Error(error.sqlMessage || error.message);
        }
    }
    public async getBandDetails(input: string): Promise<Band> {
         try{
             const result = await this.getConnection()
             .select('*')
             .where({ id: input })
             .orWhere({ name: input })
             .into('bandas')

             if(!result[0]) {
                 throw new Error("Band not found!");
             }

             return Band.toBandModel(result[0])!;
         }
         catch(error: any) {
                throw new Error(error.sqlMessage || error.message); 
         }
    }
}