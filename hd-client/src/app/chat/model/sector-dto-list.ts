import { Links } from "../../shared/model/hateoas/links"
import { Page } from "../../shared/model/hateoas/page"
import { SectorDto } from "./sector-dto"

export interface SectorDtoList {

    _embedded: {
        sectorVOList: SectorDto[]
    },
    _links: {
        self: Links
    },
    page: Page
}