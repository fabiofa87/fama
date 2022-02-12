import { BandDatabase } from "../data/BandDatabase";
import { ShowsDatabase } from "../data/ShowsDatabase";
import { Shows, ShowsInputDTO, Week_Day } from "../entities/Shows";
import { UserRole } from "../entities/User";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";

export class ShowBusiness{
    constructor(
        private showDatabase: ShowsDatabase,
        private bandDatabase: BandDatabase,
        private idGenerator: IdGenerator,
        private authenticator: Authenticator
    ) {}

    async createShow(input: ShowsInputDTO, token: string) {
        const tokenData = this.authenticator.getTokenData(token);
        if(tokenData.role !== UserRole.ADMIN) {
            throw new Error("You do not have permission to perform this action!");
        }

        if(!input.band_id || !input.weekDay || !input.start_time || !input.end_time) {
            throw new Error("Not all required fields were provided!");
        }

        if(input.start_time < 8 || input.start_time > 23 || input.start_time >= input.end_time) {
            throw new Error("Start time must be before 8:00 and end time must be before 23:00!");
        }

        if(!Number.isInteger(input.start_time) || !Number.isInteger(input.end_time)) {
            throw new Error("Start time and end time must be integers!");
        }

        const band = await this.bandDatabase.getBandDetails(input.band_id);

        if(!band) {
            throw new Error("Band does not exist!");
        }

        const registeredShows = await this.showDatabase.getScheduledShows(input.start_time, input.end_time, input.weekDay);
        
        if(registeredShows.length) {
            throw new Error("There are not available to schedule show!");
        } 

        await this.showDatabase.createShow(
            Shows.toShowModel(
                {
                    ...input,
                    id: this.idGenerator.generate()
                }
            )
        )
    }
    async getShowsByWeekDay(weekDay: Week_Day) {
        
        if(!weekDay) {
            throw new Error("Week day must be provided!");
        }
        const shows = await this.showDatabase.getShowsByWeekDay(weekDay);

        return {result: shows }
    }
}