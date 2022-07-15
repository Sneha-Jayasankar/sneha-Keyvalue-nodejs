import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { AbstractEntity } from "./AbstractEntity";
import { Employee } from "./Employee";

@Entity("employeeaddress")
    export class EmployeeAddress extends AbstractEntity {
        @PrimaryGeneratedColumn("uuid")
        public id: string;
    
        @Column({ nullable: false })
        public city: string;

        @Column({ nullable: false })
        public state: string;

        @Column({ nullable: false })
        public zip: string;

        // @OneToOne(() => Employee, (employee) => employee.employeeaddress)
        // @JoinColumn()
        // public employee: Employee[];
    }
