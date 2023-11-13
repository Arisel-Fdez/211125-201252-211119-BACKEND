export class Transaction {
    constructor(
        readonly id: number,
        public date: Date,
        public type: string,
        public amount: string,
        public description: string,
        public categoriId: string,
        public accountId: number
    ) {}
}
