import { getConnection, ObjectLiteral } from "typeorm";
import { Employee } from "../entities/Employee";
import { plainToClass } from "class-transformer";

export class EmployeeRepository{
    async getAllEmployees(){
         const employeeRepo = getConnection().getRepository(Employee);
        return employeeRepo.find();
    }

//     async createanEmployee(employeeData: ObjectLiteral){
//         const employeeRepo = getConnection().getRepository(Employee);
//     //  console.log(employeeData);
//         const savedEmployee = employeeRepo.save(employeeData);
//        return savedEmployee;
//    }
    async getEmployeeById(id: any ){
        const employeeRepo = getConnection().getRepository(Employee);
       return employeeRepo.findOne(id);
   }
   async deleteEmployee(id:any){
    const employeeRepo = getConnection().getRepository(Employee);
   return employeeRepo.softDelete(id);
    }

    async updateEmployee(employeeData:ObjectLiteral){
        const employeeRep = getConnection().getRepository(Employee);
        const temp=await employeeRep.findOne(employeeData.id);
        employeeData.employeeaddressId=temp.employeeaddressId;
        await employeeRep.update(employeeData.id,employeeData);
        const newvar= await employeeRep.findOne(employeeData.id);
        return newvar;

        }



        public async getEmployeeByName(name: string) {
            const employeeRepo = getConnection().getRepository(Employee);
            const employeeDetail = await employeeRepo.findOne({
                where: { name },
            });
            return employeeDetail;
        }
        public async saveEmployeeDetails(employeeDetails: Employee) {
            const employeeRepo = getConnection().getRepository(Employee);
            return employeeRepo.save(employeeDetails);
        }
    }