/**
 * Wraps Controllers for easy import from other modules
 */
import { AddressRepository } from "../repository/AddressRepository";
import { DepartmentRepository } from "../repository/DepartmentRepository";
import { EmployeeRepository } from "../repository/EmployeeRepository";
import { AddressService } from "../service/AddressService";
import { DepartmentService } from "../service/DepartmentService";
import { EmployeeService } from "../service/EmployeeService";
import departmentController from "./departmentController";
import employeeController from "./employeeController";
import HealthController from "./HealthController";
export default [
  new HealthController(),
  new employeeController(new EmployeeService(new EmployeeRepository), new AddressService(new AddressRepository())),
  new departmentController(new DepartmentService(new DepartmentRepository()))
];

export const enum Users{
  ADMIN="admin",
  HR="hr",
  MANAGER="manager",
  ENGINEER="engineer"
}