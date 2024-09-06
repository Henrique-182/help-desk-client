import { UserPermission } from "../../auth/model/user-permission";
import { UserTypeSctrDto } from "./user-type-sctr-dto";

export interface UserSctrDto {

    key: number,
	username: string,
	fullname: string
	type: UserTypeSctrDto,
	enabled: boolean
	permissions: UserPermission[]
}