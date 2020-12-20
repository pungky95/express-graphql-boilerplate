import {
    PrimaryGeneratedColumn,
    Column,
    Entity,
    BaseEntity,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn
} from "typeorm";

import {
    Field,
    ID,
    ObjectType
} from "type-graphql";

@Entity()
@ObjectType()
export class Permission extends BaseEntity{
    @PrimaryGeneratedColumn()
    @Field(() => ID)
    id:number

    @Column()
    @Field(() => String)
    name:string

    @CreateDateColumn()
    @Field(() => Date)
    createdAt:Date

    @UpdateDateColumn()
    @Field(() => Date)
    updatedAt:Date

    @DeleteDateColumn({nullable:true})
    deletedAt?:Date
}