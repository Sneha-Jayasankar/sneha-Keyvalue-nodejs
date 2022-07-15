import { AbstractController } from "../util/rest/controller";
import { NextFunction, Response } from "express";
import RequestWithUser from "../util/rest/request";
import APP_CONSTANTS from "../constants";
import { DepartmentService } from "../service/DepartmentService";
import validationMiddleware from "../middleware/ValidationMiddleware";
import { CreateDepartmentDto } from "../dto/CreateDepartment";
import authorize from "../middleware/Authorization";
import { Users } from ".";

class departmentController extends AbstractController {
  constructor(private DepartmentService:DepartmentService) {
    super(`${APP_CONSTANTS.apiPrefix}/department`);
    this.initializeRoutes();
  }
  protected initializeRoutes() {
    this.router.get(`${this.path}`, this.getAllDepartments);
    this.router.post(`${this.path}`,validationMiddleware(CreateDepartmentDto,APP_CONSTANTS.body),this.createDepartment);
    // this.router.get(`${this.path}/:id/`, this.getDepartmentById);
    this.router.delete(`${this.path}/:id/`,authorize([Users.ADMIN,Users.HR]), this.deleteDepartment);
    this.router.put(`${this.path}`, this.updateDepartment);
  }
  private getAllDepartments = async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
      const data: any = { message: "Department details"};
      response.status(200);
      response.send( await this.DepartmentService.getAllDepartments());
    } catch (error) {
      return next(error);
    }
  }

  private createDepartment = async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
      response.status(200); console.log(request.body);
      const data= await this.DepartmentService.createDepartment(request.body);
      response.send(this.fmt.formatResponse(data,Date.now() - request.startTime,'OK'));
    } catch (error) {
      return next(error);
    }
  }


  private deleteDepartment = async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
      response.status(200);
      const data= await this.DepartmentService.deleteDepartment(request.params.id);
      response.send(this.fmt.formatResponse(data,Date.now() - request.startTime,'OK'));
    } catch (error) {
      return next(error);
    }
  }

  private updateDepartment = async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {

      response.status(200);
      const data= await this.DepartmentService.updateDepartment(request.body);
      response.send(this.fmt.formatResponse(data,Date.now() - request.startTime,'OK'));
    } catch (error) {
      return next(error);
    }
  }
}

export default departmentController;