import { MessageType } from "../room/message-type-enum";
import { RoomMssg } from "./room-mssg";
import { UserMssg } from "./user-mssg";

export interface MessageDto {

    key: number,
    user: UserMssg,
    room: RoomMssg,
    type: MessageType,
    content: string,
    createDatetime: Date,
    updateDatetime: Date,
    deleteDatetime: Date
}
