import { Type } from "class-transformer";
import { IsNumber, IsString, ValidateIf, ValidateNested } from "class-validator";
import { CreateAddressDto } from "./CreateAddress";

export class CreateEmployeeDto {
    @IsString()
    public name: string;

    // @IsString()
    // public username: string;

    // @IsNumber()
    // public age: number;

    @IsString()
    public departmentId: string;

    // @IsString()
    // public employeeaddressId: string;
    @IsString()
    public password: string;

    @IsString()
    public role: string;

    // @IsString()
    // public city: string;

    // @IsString()
    // public state: string;

    // @IsString()
    // public zip: string;

    @ValidateIf(o=>o.address.id==null)
    @ValidateNested({each:true})
    @Type(()=>CreateAddressDto)
    public address: CreateAddressDto;
}