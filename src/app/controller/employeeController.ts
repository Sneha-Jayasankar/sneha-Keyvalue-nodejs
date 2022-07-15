import { AbstractController } from "../util/rest/controller";
import { NextFunction, Response } from "express";
import RequestWithUser from "../util/rest/request";
import APP_CONSTANTS from "../constants";
import { EmployeeService } from "../service/EmployeeService";
import validationMiddleware from "../middleware/ValidationMiddleware";
import { CreateEmployeeDto } from "../dto/CreateEmployee";
import { now } from "moment";
import authorize from "../middleware/Authorization";
import { AddressService } from "../service/AddressService";
import { Department } from "../entities/Department";
import { DepartmentService } from "../service/DepartmentService";
import { plainToClass } from "class-transformer";
import { EmployeeAddress } from "../entities/EmployeeAddress";
import { Users } from ".";

class employeeController extends AbstractController {
  constructor(private employeeService:EmployeeService, private addressService:AddressService) {
    super(`${APP_CONSTANTS.apiPrefix}/employee`);
    this.initializeRoutes();
  }
  protected initializeRoutes() {

    this.router.get(`${this.path}`, this.getAllEmployees);
    this.router.post(`${this.path}`,validationMiddleware(CreateEmployeeDto,APP_CONSTANTS.body),this.createEmployee);
    this.router.get(`${this.path}/:id/`, this.getEmployeeById);
    this.router.delete(`${this.path}/:id/`,authorize([Users.ADMIN,Users.HR]), this.deleteEmployee);
    this.router.put(`${this.path}`, this.updateEmployee);
    this.router.post(`${this.path}/login`,this.login);
  }
  
  private getAllEmployees = async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
      // const data: any = { message: "Employee details"};
      response.status(200);
      const empdata=await this.employeeService.getAllEmployees();
      const addrdata=await this.addressService.getAllAddresss();
      const employees = empdata.map(employee => {
        // console.log(addrData.find(address => address.id === employee.employeeaddressId).city)
        let address=addrdata.find(address => address.id === employee.employeeaddressId);
        return {
          name: employee.name,
          departmentId: employee.departmentId,
          city: address.city,
          state:address.state,
          zip:address.zip
        }
      })
      const data = {
        employees: employees
      }
      console.log(employees)
      response.send(this.fmt.formatResponse(data, Date.now() - request.startTime, 'OK'));
    } catch (error) {
      return next(error);
    }
  }

  private createEmployee = async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
    //   const data: any = { message: "Employee details"};
      response.status(200);
      //  console.log(request.body);
      const addrdata=await this.addressService.createAddress(request.body.address);
      // const deptdata=await this.departmentService.createDepartment(request.body);
      const empdata= await this.employeeService.createEmployee(request.body,addrdata.id);
      response.send(this.fmt.formatResponse(empdata,Date.now() - request.startTime,'OK'))
    } catch (error) {
      return next(error);
    }
  }

  private getEmployeeById = async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
      response.status(200);
      const employee = await this.employeeService.getEmployeeById(request.params.id);
      console.log(employee)
      const address = await this.addressService.getAddressById(employee.employeeaddressId);
      console.log(address)
      const data = {
        name: employee.name,
        role: employee.role,
        departmentId: employee.departmentId,
        city: address.city,
        state: address.state,
        zip: address.zip
      }
      response.send(this.fmt.formatResponse(data, Date.now() - request.startTime, 'OK'));
    } catch(error) {
      console.log(error)
      return next(error);
    }
  }

  private deleteEmployee = async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
    //   const data: any = { message: "Employee details"};
      response.status(200);
      const data= await this.employeeService.deleteEmployee(request.params.id);
      response.send(this.fmt.formatResponse(data,Date.now() - request.startTime,'OK'));
    } catch (error) {
      return next(error);
    }
  }

  // private updateEmployee = async (request: RequestWithUser, response: Response, next: NextFunction) => {
  //   try {
  //   //   const data: any = { message: "Employee details"};
  //     response.status(200);
  //     const data= await this.employeeService.updateEmployee(request.body);
  //     response.send(this.fmt.formatResponse(data,Date.now() - request.startTime,'OK'));
  //   } catch (error) {
  //     return next(error);
  //   }
  // }
  private updateEmployee = async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
      response.status(200);
      const newEmpData = await this.employeeService.updateEmployee(request.body);
      console.log(newEmpData);
      const address = plainToClass(EmployeeAddress, {
        id: newEmpData.employeeaddressId,
        city: request.body.city,
        state: request.body.state,
        zip: request.body.zip
      })
      console.log(address)
      const newAddrData = await this.addressService.updateAddress(address);
      const data = {
        "employee": newEmpData,
        "address": newAddrData
      }
      response.send(this.fmt.formatResponse(data, Date.now() - request.startTime, 'OK'));
    }
    catch(error) {
      return next(error);
    }
  }
  private login = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    const loginData = request.body;
    console.log(request.body);
    const loginDetail = await this.employeeService.employeeLogin(
      loginData.name.toLowerCase(),
      loginData.password
    );
    response.send(
      this.fmt.formatResponse(loginDetail, Date.now() - request.startTime, "OK")
    );
  };
}

export default employeeController;
