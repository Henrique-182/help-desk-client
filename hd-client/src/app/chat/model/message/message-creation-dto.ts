import { MessageType } from "../room/message-type-enum";

export interface MessageCreationDto {

    roomKey: number,
	type: MessageType,
	content: string
}
