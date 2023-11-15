export class Comment {
    constructor(
        readonly id: number,
        readonly userId: number,
        readonly publicationId: number,
        readonly content: string
    ) {}
}
