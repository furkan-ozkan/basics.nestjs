# nestjs-basics

## New nestjs project
**In Terminal**
```
nest new \<ProjectName>
```
## Update package.json for typeorm and postgresql
**In Terminal**
```
npm i @nestjs/typeorm typeorm pg @nestjs/config
```

## Create an environment file
Now lets create an environment file in project main folder and name it as 
```.env```

and fill in it like this.
```
POSTGRES_HOST= <localhost or ip>
POSTGRES_PORT= <PostgresPort>
POSTGRES_USER= <Postgres username>
POSTGRES_PASSWORD= <PostgresPass>
POSTGRES_DATABASE= <DataBaseName>
```

## app.module.ts
Lets update inside of app.module. Inside of imports we will add 2 new things.
```
imports: 
  [
    /// set config module settings for global
    ConfigModule.forRoot({isGlobal: true}),
    
    /// fill typeorm settings
    TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: parseInt(<string>process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    autoLoadEntities: true,
    synchronize: true,})
  ]
```

## Run nestjs project
to run nestjs project write this

**In Terminal**

```
npm run start:dev
```

## Create folders and files
**In Terminal**

* **For Create Model**
  -  ```nest g mo customer```
* **For Create Service**
  -  ```nest g s customer/customer --flat --no-spec```
* **For Create Controller**
  -  ```nest g c customer/customer --flat --no-spec```


## Create entity & interfaces
**Interface**

Create customer.interface.ts file
like this:
```
export interface ICustomer{
    id?: number;
    name?: string;
    createdAt?: Date;
}
```
**Entity**

 And than create customer.entity.ts
 ```
 import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity('customer_entity')
export class CustomerEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: ''})
    body: string;

    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date;
}
 ```

 @Entity(<span style='color: green;'>'customer_entity'</span>)
 <p>This <span style='color: green;'><b>Green</b></span> part's meaning database table name. If you have a database named as <span style='color: green;'><b>customer_entity</b></span> typeorm will work on this database table but if you dont have any than it will create a new table named as like this. </p>
 <p>Performing operations based on @Column() and similar structures on the database.</p>

 ## customer.module
 ```
 @Module({
  imports: [TypeOrmModule.forFeature([CustomerEntity])],
  providers: [CustomerService],
  controllers: [CustomerController]
})
export class CustomerModule {}
```
In this module file we added this line:

<span style='color: green;'>imports: [TypeOrmModule.forFeature([CustomerEntity])]</span>

but dont forget to add library or location imports.


## customer.controller
### Constructor
For controller first of all we need to create a constructor and in this constructor we will create an instance for service.
```
@Controller('customer')
export class CustomerController {
    constructor(private customerService: CustomerService){}
}
```
**Decorators**
- **@Controller**
  
  This decorator effects to how can we access this controller. for example in this example we write 'customer' and while we are testing it we will use:
  
  Access path: http://localhost:5432/customer

- **@Get**
  
  Specifies a method that responds to an HTTP GET request.

  Access path: GET http://localhost:5432/customer

- **@Post**
  
  Creates a route handler for a specific HTTP POST request.

  Access path: POST http://localhost:5432/customer

- **@Put**
  
  Creates a route handler for a specific HTTP PUT request.

  Access path: PUT http://localhost:5432/customer

- **@Delete**
  
  Creates a route handler for a specific HTTP DELETE request.

  Access path: DELETE http://localhost:5432/customer

- **@Param**
  
  Retrieves URL parameters from the route.

  Access path: GET http://localhost:5432/customer/123
  
- **@Body**
  
  Retrieves data from the body of the HTTP request.

  Access path: POST http://localhost:5432/customer

- **@Injectable**
  
  Used to inject dependencies.

- **@InjectRepository**
  
  it facilitates the automatic injection of a specialized class (repository) used for database operations into the relevant service or controller.

---------------------------------------------------------------------------------

### Create

```
    @Post()
    create(@Body() icustomer: ICustomer): Observable<ICustomer>{
         return this.customerService.createCustomer(icustomer)
    }
```

### Get

```
    @Get()
    findAllCustomers(): Observable<ICustomer[]>{
         return this.customerService.findAllCustomers()
    }
```


### Update

```
    @Put(':id')
    update(@Param('id') id: number,
        @Body() icustomer: ICustomer
    ): Observable<UpdateResult>{
        return this.customerService.updateCustomer(id, icustomer);
    }
```

### Delete

```
    @Delete(':id')
    deelte(@Param('id') id: number): Observable<DeleteResult>{
        return this.customerService.deleteCustomer(id);
    }
```
### customer.controller FINAL
```
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
```



## customer.service
### Constructor
```
@Injectable()
export class CustomerService {
  constructor(
          @InjectRepository(CustomerEntity)
          private readonly customerEntityRepository: Repository<CustomerEntity>
      ){}
}
```
### Constructor
```
createCustomer(icustomer: ICustomer): Observable<ICustomer>{
        return from(this.customerEntityRepository.save(icustomer));
    }
```
### Constructor
```
findAllCustomers(): Observable<ICustomer[]>{
        return from(this.customerEntityRepository.find());
    }
```
### Constructor
```
updateCustomer(id: number, icustomer: ICustomer): Observable<UpdateResult> {
        return from(this.customerEntityRepository.update(id,icustomer));
    }
```
### Constructor
```
deleteCustomer(id: number): Observable<DeleteResult>{
        return from(this.customerEntityRepository.delete(id));
    }
```




### customer.service FINAL
```
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
```

 

------------
## Optional
##### Global prefix
After setting global prefix you can access with this prefix, for example:
htttp://localhost/\<globalprefixname>
```
app.setGloablPrefix('<globalprefixname>');
```
