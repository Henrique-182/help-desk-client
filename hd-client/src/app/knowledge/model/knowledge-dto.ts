import { Links } from "../../shared/model/hateoas/links";
import { SoftwareDto } from "./software-dto";
import { TagDto } from "./tag-dto";

export interface KnowledgeDto {

    key: number,
    title: string,
    software: SoftwareDto,
    content: string,
    tags: TagDto[],
    _links: Links
    
}
