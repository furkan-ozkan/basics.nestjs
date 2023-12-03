import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerEntity } from './customer.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { ICustomer } from './customer.interface';
import { Observable, from } from 'rxjs';

@Injectable()
export class CustomerService {
    constructor(
        @InjectRepository(CustomerEntity)
        private readonly customerEntityRepository: Repository<CustomerEntity>
    ){}

    createCustomer(icustomer: ICustomer): Observable<ICustomer>{
        return from(this.customerEntityRepository.save(icustomer));
    }

    findAllCustomers(): Observable<ICustomer[]>{
        return from(this.customerEntityRepository.find());
    }

    updateCustomer(id: number, icustomer: ICustomer): Observable<UpdateResult> {
        return from(this.customerEntityRepository.update(id,icustomer));
    }

    deleteCustomer(id: number): Observable<DeleteResult>{
        return from(this.customerEntityRepository.delete(id));
    }
}