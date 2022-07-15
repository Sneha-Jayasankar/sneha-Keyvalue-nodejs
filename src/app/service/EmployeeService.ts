import { plainToClass } from "class-transformer";
import { request } from "http";
import { ObjectLiteral } from "typeorm";
import { Employee } from "../entities/Employee";
import EntityNotFoundException from "../exception/EntityNotFoundException";
import HttpException from "../exception/HttpException";
import { EmployeeRepository } from "../repository/EmployeeRepository";
import bcrypt from "bcrypt";
import UserNotAuthorizedException from "../exception/UserNotAuthorizedException";
import IncorrectUsernameOrPasswordException from "../exception/IncorrectUsernameOrPasswordException";
import jsonwebtoken from "jsonwebtoken";

export class EmployeeService{
    constructor(private employeerepo: EmployeeRepository){}
        
   async getAllEmployees(){
        const emp= await this.employeerepo.getAllEmployees();
        return emp;
    }

    // async createanEmployee(employeeData: ObjectLiteral,id:string){
    //     return await this.employeerepo.createanEmployee(employeeData);
    // }

    public async createEmployee(employeeDetails: any,/*departmentId:string*/addressId:string) {
      try {
          const newEmployee = plainToClass(Employee, {
              name: employeeDetails.name,
              username: employeeDetails.username,
              password: employeeDetails.password ?  await bcrypt.hash(employeeDetails.password, 10): '',
              role: employeeDetails.role,
              // departmentId: departmentId,
              departmentId:employeeDetails.departmentId,
              employeeaddressId: addressId,
              isActive: true,
          });
          const save = await this.employeerepo.saveEmployeeDetails(newEmployee);
          return save;
      } catch (err) {
          throw new HttpException(400,"400", "Failed to create employee");
      }
  }
    async getEmployeeById(id:any){
        const emp= await this.employeerepo.getEmployeeById(id);
        if(!emp){
            throw new EntityNotFoundException({
                CODE:"404",
                MESSAGE:"Employee with the given id is not found"
            })
        }
        return emp;
    }
   async  deleteEmployee(id:any){
        return await this.employeerepo.deleteEmployee(id);
    }

    async  updateEmployee(employeeData: ObjectLiteral){
      employeeData.password=employeeData.password? await bcrypt.hash(employeeData.password,10): ''
      const updatedEmp= await this.employeerepo.updateEmployee(employeeData);
        return updatedEmp;
    }


    public employeeLogin = async (
        name: string,
        password: string
      ) => {
        const employeeDetails = await this.employeerepo.getEmployeeByName(
          name
        );
        if (!employeeDetails) {
          throw new UserNotAuthorizedException();
        }
        const validPassword = await bcrypt.compare(password, employeeDetails.password);
        if (validPassword) {
          let payload = {
            "custom:id": employeeDetails.id,
            "custom:name": employeeDetails.name,
            "custom:role":employeeDetails.role,
          };
          const token = this.generateAuthTokens(payload);

          return {
            idToken: token,
            employeeDetails,
          };
        } else {
          throw new IncorrectUsernameOrPasswordException();
        }
      };

     private generateAuthTokens = (payload: any) => {
        return jsonwebtoken.sign(payload, process.env.JWT_TOKEN_SECRET, {
          expiresIn: process.env.ID_TOKEN_VALIDITY,
        });
      };  
    }