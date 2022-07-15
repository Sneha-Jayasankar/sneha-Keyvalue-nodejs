import { getConnection, ObjectLiteral } from "typeorm";
import { Department } from "../entities/Department";

export class DepartmentRepository{
    async getAllDepartments(){
         const departmentRepo = getConnection().getRepository(Department);
        return departmentRepo.find();
    }
    
  async deleteDepartment(id:any){
   const departmentRepo = getConnection().getRepository(Department);
  return departmentRepo.softDelete(id);
   }

   async updateDepartment(departmentData:ObjectLiteral){
       const departmentRepo = getConnection().getRepository(Department);
       const temp=await departmentRepo.findOne({id:departmentData.id});
       temp.name=departmentData.name;
      return await departmentRepo.save(temp);
       }

       public async saveDepartmentDetails(departmentData: Department) {
        const departmentRepo = getConnection().getRepository(Department);
        return departmentRepo.save(departmentData);
    }
    }