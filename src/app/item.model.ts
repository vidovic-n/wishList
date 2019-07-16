
export class Item {
    constructor(
    public id: string,
    public title: string,
    public description: string,
    public imageUrl: string,
    public category: string,
    public price: number,
    public purchased: boolean
    ) {}

}
