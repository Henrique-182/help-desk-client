import { MessageType } from "./message-type-enum"
import { RoomDto } from "./room-dto"
import { UserRoom } from "./user-room"

export interface MessageRoom {

    key: number,
    room?: RoomDto,
    user: UserRoom,
    type: MessageType,
    content: string,
    createDatetime: Date,
    updateDatetime: Date,
    deleteDatetime: Date
}