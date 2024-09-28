import { Links } from "../../../shared/model/hateoas/links";
import { MessageRoom } from "./message-room";
import { RoomPriorityDto } from "./room-priority-dto";
import { RoomStatus } from "./room-status-enum";
import { SectorRoom } from "./sector-room";
import { UserRoom } from "./user-room";

export interface RoomDto {

    key: number,
    code: number,
    status: RoomStatus,
    priority: RoomPriorityDto,
    reason: string,
    solution: string,
    createDatetime: Date,
    closeDatetime: Date,
    customer: UserRoom,
    employee: UserRoom,
    sector: SectorRoom,
    messages: MessageRoom[],
    _links: Links
}