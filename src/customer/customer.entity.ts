import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity('customer_entity')
export class CustomerEntity{

   @PrimaryGeneratedColumn()
   id: number;

   @Column({ default: ''})
   name: string;

   @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
   createdAt: Date;
}