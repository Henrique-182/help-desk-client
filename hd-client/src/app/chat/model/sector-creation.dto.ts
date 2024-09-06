import { UserSctrDto } from "./user-sctr-dto";

export interface SectorCreationDto {

    key: number,
    employees: UserSctrDto[],
    customers: UserSctrDto[]
}