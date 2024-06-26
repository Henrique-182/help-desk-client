import { Links } from "../../shared/model/hateoas/links"
import { Page } from "../../shared/model/pageable/page"
import { UserDto } from "./user-dto"

export interface UserDtoList {

    _embedded: {
        userVOList: UserDto[]
    },
    _links: {
        self: Links
    },
    page: Page

}
