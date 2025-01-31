import { Column, Entity, OneToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { User } from "./user";

@Entity()
@Unique(["username"])
export class Credentials {
    @PrimaryGeneratedColumn()
    id: number

     @Column({
        length: 15
     })
     username: string

     @Column()
     password: string

     @OneToOne(() => User , (user) => user.credential)
     user: User
}


