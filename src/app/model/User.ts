export class User {
    constructor(
        public login: string,
        public password: string,
        public id?: number| string
    ) {}
}