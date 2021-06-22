export class User {
    constructor(
        public id: number| string,
        public login: string,
        public password: string
    ) {}
}