import { UserSctrDto } from "./user-sctr-dto";

export interface SectorDto {

    key: number,
    description: string,
    customers: UserSctrDto[],
    employees: UserSctrDto[]
}
