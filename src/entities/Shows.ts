export class Shows {
    constructor(
        private id: string,
        private weekday: string,
        private start_time: string,
        private end_time: string,
        private band_id: string
    ) {}
    public getId(): string {
        return this.id;
    }
    public getWeekday(): string {
        return this.weekday;
    }
    public getStartTime(): string {
        return this.start_time;
    }
    public getEndTime(): string {
        return this.end_time;
    }
    public getBandId(): string {
        return this.band_id;
    }
}