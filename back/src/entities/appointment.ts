export enum stateRole {
    ACTIVE = "active",
    CANCEL = "cancel"
}

import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user";

@Entity()
export class Appointments {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: "date"
    })
    date: Date

    @Column()
    time: string

    @Column()
    userId: number

    @Column({
        type: "enum",
        enum: stateRole,
        default: stateRole.ACTIVE 
    })
    status: stateRole

    @ManyToOne(() => User, (user)=> user.appointments)
    user: User
    static userId: any;
}

