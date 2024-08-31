import { Links } from "../../../shared/model/hateoas/links";
import { MessageRoom } from "./message-room";
import { RoomStatus } from "./room-status-enum";
import { SectorRoom } from "./sector-room";
import { UserRoom } from "./user-room";

export interface RoomDto {

    key: number,
    code: number,
    status: RoomStatus,
    customer: UserRoom,
    employee: UserRoom,
    sector: SectorRoom,
    messages: MessageRoom[],
    _links: Links
}