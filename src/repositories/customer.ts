import { 
    dataSource,
  } from "@medusajs/medusa/dist/loaders/database"
  import { CustomerRepository as MedusaCustomerRepository } from "@medusajs/medusa/dist/repositories/customer"
  import { Customer } from "../models/customer";
  
  export const CustomerRepository = dataSource
    .getRepository(Customer)
    .extend({
      // it is important to spread the existing repository here.
      //  Otherwise you will end up losing core properties
      ...Object.assign(MedusaCustomerRepository, {
        target: Customer,
      }),
    })
  
  export default CustomerRepository