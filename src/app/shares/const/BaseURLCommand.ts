import { environment } from "src/environments/environment";
export class CommandURL {
    public static MUSIC_BASE = environment.BACKEND_ADDRESS + '/music'
    // public static upFile = this.MUSIC_BASE + '/updaFile';
    public static sendData = this.MUSIC_BASE + '/sendData';  
    public static getList = this.MUSIC_BASE + '/getList';  
}