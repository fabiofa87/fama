import { BaseDatabase } from "./BaseDatabase";
import { Shows, ShowsOutputDTO, Week_Day } from "../entities/Shows";


export class ShowsDatabase extends BaseDatabase {
    public async createShow(show: Shows): Promise<void> {
        try{
            await this.getConnection()
            .insert({
                id: show.getId(),
                band_id: show.getBandId(),
                start_time: show.getStartTime(),
                weekday: show.getWeekday(),
                end_time: show.getEndTime(),
            })
            .into(this.tableNames.shows)
        }
        catch(error: any) {
            throw new Error(error.sqlMessage || error.message);
        }
    }
    public async getScheduledShows(start_time: number, end_time: number, week_day: Week_Day): Promise<ShowsOutputDTO[]> {
            const shows = await this.getConnection()
            .select('*')
            .where("end_time", ">", start_time)
            .andWhere("start_time", "<", end_time)
            .from(this.tableNames.shows)

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
    public async getShowsByWeekDay(week_day: Week_Day): Promise<ShowsOutputDTO[]> {

        
        const shows = await this.getConnection().raw
        (
        `
        SELECT  s.id as id,
                b.id as band_id,
                s.start_time as start_time,
                s.end_time as end_time,
                s.weekday as weekday
        FROM ${this.tableNames.shows} s
        LEFT JOIN ${this.tableNames.bandas} b ON b.id = s.band_id
        WHERE s.weekDay = "${week_day}"
        ORDER BY start_time ASC
        `
        )

        if(!shows.length){
            throw new Error(`There are no shows scheduled on ${week_day}`)
        }

        return shows[0].map((show:any) => ({
            id: show.id,
            band_id: show.band_id,
            start_time: show.start_time,
            end_time: show.end_time,
            week_day: show.weekday,
            music_genre: show.music_genre,
        }))
    }
}