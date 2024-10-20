import { RoomStatus } from "../room/room-status-enum";

export interface RoomStatusQuantityDto {

    status: RoomStatus,
    quantity: number
}