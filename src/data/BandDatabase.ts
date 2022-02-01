import { Band } from "../entities/Band";
import { BaseDatabase } from "./BaseDatabase";

export class BandDatabase extends BaseDatabase {
    public async addBand(band: Band): Promise<void> {
        try {
            const result = await this.connection('bandas')
            .insert({
                id: band.getId(),
                name: band.getName(),
                music_genre: band.getMusicGenre(),
                responsible: band.getResponsible(),
            })
            
        }
        catch(error: any) {
            throw new Error(error.sqlMessage || error.message);
        }
    }
}