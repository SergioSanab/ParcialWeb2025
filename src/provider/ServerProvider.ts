import Env from "../types/Env";

export default class ServerProvider {
    private readonly env: Env;

    constructor() {
        this.env = {
            PORT: Number(process.env['PORT']) || 1888,
            HOST: process.env['HOST'] || 'localhost',
            STATIC_DIR: process.env['STATIC_DIR'] || '../../assets/img',
        }
    }

    readonly HOST = () => this.env.HOST;
    readonly PORT = () => this.env.PORT;
    readonly STATIC_DIR = () => this.env.STATIC_DIR;

}