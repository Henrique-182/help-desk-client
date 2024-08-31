import { UserType } from "../../../auth/model/user-type-enum";

export interface UserRoom {

    key: number,
    username: string, 
    fullname: string,
    type: UserType,
    enabled: boolean
}