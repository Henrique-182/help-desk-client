import { UserTypeDto } from "./user-type-dto";

export interface UserCreationDto {

    username: string,
    fullname: string,
    type: UserTypeDto,
    password: string
}
