import { UserType } from "../../../auth/model/user-type-enum";

export interface UserMssg {

    key: number,
    username: string, 
    fullname: string,
    type: UserType,
    enabled: boolean
}
