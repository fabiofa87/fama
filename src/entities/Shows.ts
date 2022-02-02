export enum Week_Day {
    FRIDAY = "FRIDAY",
    SATURDAY = "SATURDAY",
    SUNDAY = "SUNDAY"
}

export class Shows {
    constructor(
        private id: string,
        private weekday: Week_Day,
        private start_time: number,
        private end_time: number,
        private band_id: string
    ) {}
        public getId(): string {
        return this.id;
        }
        public setId(id: string) {
        this.id = id;
        }
        public getWeekday(): Week_Day {
        return this.weekday;
        }
        public setWeekday(weekday: Week_Day) {
        this.weekday = weekday;
        }
        public getStartTime(): number {
        return this.start_time;
        }
        public setStartTime(start_time: number) {
        this.start_time = start_time;
        }
        public getEndTime(): number {
        return this.end_time;
        }
        public setEndTime(end_time: number) {
        this.end_time = end_time;
        }
        public getBandId(): string {
        return this.band_id;
        }
        public setBandId(band_id: string) {
        this.band_id = band_id;
        }
        
        

    public static toWeekDayModel(obj?: any): Week_Day{
        switch(obj) {
            case "FRIDAY":
                return Week_Day.FRIDAY;
            case "SATURDAY":
                return Week_Day.SATURDAY;
            case "SUNDAY":
                return Week_Day.SUNDAY;
            default:
                throw new Error("Invalid Week_Day!");
        }
    }

    public static toShowModel(obj?: any) {
        return (obj && new Shows(
            obj.id,
            Shows.toWeekDayModel(obj.weekday || obj.week_day || obj.weekDay),
            obj.start_time || obj.startTime, 
            obj.end_time || obj.endTime,
            obj.band_id || obj.bandId,
        ))
    }
}

export interface ShowsInputDTO {
    start_time: number;
    end_time: number;
    weekDay: Week_Day;
    band_id: string;
}

export interface ShowsOutputDTO {
    id: string;
    band_id: string;
    week_day: Week_Day;
    start_time: number;
    end_time: number;
}
