import { plainToClass } from "class-transformer";
import { request } from "http";
import { ObjectLiteral } from "typeorm";
import { EmployeeAddress } from "../entities/EmployeeAddress";
import EntityNotFoundException from "../exception/EntityNotFoundException";
import HttpException from "../exception/HttpException";
import { AddressRepository } from "../repository/AddressRepository";
import bcrypt from "bcrypt";
import UserNotAuthorizedException from "../exception/UserNotAuthorizedException";
import IncorrectUsernameOrPasswordException from "../exception/IncorrectUsernameOrPasswordException";
import jsonwebtoken from "jsonwebtoken";

export class AddressService{
    constructor(private addressrepo: AddressRepository){}
        
   async getAllAddresss(){
        return await this.addressrepo.getAllAddresss();
    }

    async createAddress(addressData: ObjectLiteral){
        return await this.addressrepo.createAddress(addressData);
    }
    async getAddressById(id:any){
        const emp= await this.addressrepo.getAddressById(id);
        if(!emp){
            throw new EntityNotFoundException({
                CODE:"404",
                MESSAGE:"Address with the given id is not found"
            })
        }
        return emp;
    }
   async  deleteAddress(id:any){
        return await this.addressrepo.deleteAddress(id);
    }

    async  updateAddress(addressData: ObjectLiteral){
        return await this.addressrepo.updateAddress(addressData);
    }
}