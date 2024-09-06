import { UserTypeMssgDto } from "./user-type-mssg-dto";

export interface UserMssg {

    key: number,
    username: string, 
    fullname: string,
    type: UserTypeMssgDto,
    enabled: boolean
}
