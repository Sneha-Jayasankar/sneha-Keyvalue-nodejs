import { getConnection, ObjectLiteral } from "typeorm";
import { EmployeeAddress } from "../entities/EmployeeAddress";
import { plainToClass } from "class-transformer";

export class AddressRepository{
    async getAllAddresss(){
         const addrRepo = getConnection().getRepository(EmployeeAddress);
        return addrRepo.find();
    }

    async createAddress(addressData: ObjectLiteral){
        const addrRepo = getConnection().getRepository(EmployeeAddress);
    //  console.log(AddressData);
        // const savedAddress = addrRepo.save(addressData);
       return addrRepo.create(plainToClass(EmployeeAddress,{
         city:addressData.city,
         state: addressData.state,
         zip:addressData.zip
       }))
   }
    async getAddressById(id: any ){
        const addrRepo = getConnection().getRepository(EmployeeAddress);
       return addrRepo.findOne(id);
   }
   async deleteAddress(id:any){
    const addrRepo = getConnection().getRepository(EmployeeAddress);
   return addrRepo.softDelete(id);
    }

    async updateAddress(addressData:ObjectLiteral){
        const addrRepo = getConnection().getRepository(EmployeeAddress);
        // const temp=await addrRepo.findOne({id:addressData.id});
        // temp.name=addressData.name;
       return await addrRepo.update(addressData.id,addressData);
        }
    }
