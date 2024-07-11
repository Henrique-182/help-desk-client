import { Links } from "../../shared/model/hateoas/links"
import { Page } from "../../shared/model/hateoas/page"
import { KnowledgeDto } from "./knowledge-dto"

export interface KnowledgeDtoList {

    _embedded: {
        knowledgeVOList: KnowledgeDto[]
    },
    _links: {
        self: Links
    },
    page: Page
}
