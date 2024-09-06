import { Links } from "../../shared/model/hateoas/links";
import { UserPermission } from "./user-permission";
import { UserTypeDto } from "./user-type-dto";

export interface UserDto {

    key: number,
    username: string,
    fullname: string,
    type: UserTypeDto,
    accountNonExpired: boolean,
    accountNonLocked: boolean,
    credentialsNonExpired: boolean,
    enabled: boolean,
    permissions: UserPermission[]
    _links: {
        userVOlist?: Links,
        self?: Links
    }
}
