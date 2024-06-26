import { Links } from "../../shared/model/hateoas/links";
import { UserPermission } from "./user-permission";

export interface UserDto {

    key: number,
    username: string,
    fullname: string,
    accountNonExpired: boolean,
    accountNonLocked: boolean,
    credentialsNonLocked: boolean,
    enabled: boolean,
    permissions: UserPermission[]
    _links: {
        userVOlist?: Links,
        self?: Links
    }
}
