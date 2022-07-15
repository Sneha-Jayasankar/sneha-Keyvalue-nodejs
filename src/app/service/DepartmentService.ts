import { plainToClass } from "class-transformer";
import { ObjectLiteral } from "typeorm";
import { Department } from "../entities/Department";
import EntityNotFoundException from "../exception/EntityNotFoundException";
import HttpException from "../exception/HttpException";
import { DepartmentRepository } from "../repository/DepartmentRepository";
export class DepartmentService{
    constructor(private departmentrepo: DepartmentRepository){}
   async  getAllDepartments(){
        
        return await this.departmentrepo.getAllDepartments();
    }
    

    public async createDepartment(departmentDetails: any) {
        try {
            const newDepartment = plainToClass(Department, {
                name: departmentDetails.name,
            });
            console.log(newDepartment);
            const save = await this.departmentrepo.saveDepartmentDetails(newDepartment);
            return save;
        } catch (err) {
            throw new HttpException(400,"400", "Failed to create department");
        }
    }
    
   async  deleteDepartment(id:any){
    try {
        const deleteDepartment = await this.departmentrepo.deleteDepartment(id);
        return deleteDepartment;
    } catch (err) {
        throw new HttpException(400,"400", "Failed to delete department");
    }
}

    

    async  updateDepartment(departmentData: ObjectLiteral){
        try {
            const updatedDepartment = await this.departmentrepo.updateDepartment(departmentData);
            return updatedDepartment;
        } catch (err) {
            throw new HttpException(400,"400", "Failed to update department");
        }
}
}
