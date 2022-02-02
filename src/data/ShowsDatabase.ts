import { BaseDatabase } from "./BaseDatabase";
import { Shows, ShowsOutputDTO, Week_Day } from "../entities/Shows";

export class ShowsDatabase extends BaseDatabase {
    public async createShow(show: Shows): Promise<void> {
        try{
            await this.connection('shows')
            .insert({
                id: show.getId(),
                band_id: show.getBandId(),
                start_time: show.getStartTime(),
                weekday: show.getWeekday(),
                end_time: show.getEndTime(),
            })
        }
        catch(error: any) {
            throw new Error(error.sqlMessage || error.message);
        }
    }
    public async getScheduledShows(start_time: number, end_time: number, week_day: Week_Day): Promise<ShowsOutputDTO[]> {
            const shows = await this.connection('shows')
            .select('*')
            .where("end_time", ">", start_time)
            .andWhere("start_time", "<", end_time)

                return shows.map((show: any) => {
                    return {
                        id: show.id,
                        week_day: show.week_day,
                        start_time: show.start_time,
                        end_time: show.end_time,
                        band_id: show.band_id
                    }
                })
        }
}