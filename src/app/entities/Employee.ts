import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { AbstractEntity } from "./AbstractEntity";
import { Department } from "./Department";
import { EmployeeAddress } from "./EmployeeAddress";

@Entity("employee")
    export class Employee extends AbstractEntity {
        @PrimaryGeneratedColumn("uuid")
        public id: string;
    
        @Column({ nullable: false })
        public name: string;

        @Column({ nullable: true})
        public password: string;

        @Column({ nullable: true})
        public role: string;
        
@ManyToOne(() => Department, { cascade: true })
    @JoinColumn()
    public department: Department;

        @Column({ nullable: false })
        public departmentId: string;

@OneToOne(()=> EmployeeAddress,{cascade:true})
        @JoinColumn()
        public employeeaddress: EmployeeAddress;

        @Column({nullable: true})
        public employeeaddressId:string;

    }