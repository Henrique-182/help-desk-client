import { UserDto } from "../../auth/model/user-dto";

export interface SectorDto {

    key: number,
    description: string,
    customers: UserDto[],
    employees: UserDto[]
}
