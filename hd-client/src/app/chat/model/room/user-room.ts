import { UserTypeRoomDto } from "./user-type-room-dto";

export interface UserRoom {

    key: number,
    username: string, 
    fullname: string,
    type: UserTypeRoomDto,
    enabled: boolean
}