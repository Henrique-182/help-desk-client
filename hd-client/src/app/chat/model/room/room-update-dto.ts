import { RoomStatus } from "./room-status-enum";

export interface RoomUpdateDto {

    employeeKey?: number,
    sectorKey?: number,
    status: RoomStatus
}