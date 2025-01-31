import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, Unique } from "typeorm"
import { Credentials } from "./credential"
import { Appointments } from "./appointment"

@Entity()
@Unique(["email"])
export class Adress {
    @Column()
    street: string

    @Column()
    city: string
}

@Entity({
    name: "users"
})
export  class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        length: 100
    })
    name: string

    @Column({
        type: "date"
    })
    birthdate: Date

    @Column()
    nDni: number

    @Column()
    email: string

    @Column()
    phone: number
    
    @OneToOne(()=> Credentials , (credential) => credential.user)
    @JoinColumn()
    credential: Credentials

    @OneToMany(() => Appointments, (appointments =>appointments.user))
    appointments: Appointments[]
}




