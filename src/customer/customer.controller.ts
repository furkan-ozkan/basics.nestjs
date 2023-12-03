import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { ICustomer } from './customer.interface';
import { Observable } from 'rxjs';
import { DeleteResult, UpdateResult } from 'typeorm';

@Controller('customer')
export class CustomerController {
    constructor(private customerService: CustomerService){}


    @Post()
    create(@Body() icustomer: ICustomer): Observable<ICustomer>{
         return this.customerService.createCustomer(icustomer)
    }
    @Get()
    findAllCustomers(): Observable<ICustomer[]>{
         return this.customerService.findAllCustomers()
    }
    @Put(':id')
    update(@Param('id') id: number,
        @Body() icustomer: ICustomer
    ): Observable<UpdateResult>{
        return this.customerService.updateCustomer(id, icustomer);
    }
    @Delete(':id')
    deelte(@Param('id') id: number): Observable<DeleteResult>{
        return this.customerService.deleteCustomer(id);
    }
}