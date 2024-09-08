import type { 
    MedusaRequest, 
    MedusaResponse,
  } from "@medusajs/medusa"
  import AddressRepository from "src/repositories/address"
  import { EntityManager } from "typeorm"
  
export const POST = async (
    req: MedusaRequest, 
    res: MedusaResponse
) => {
    const addressRepository: typeof AddressRepository = 
    req.scope.resolve(
      "addressRepository"
    )
    const manager: EntityManager = req.scope.resolve("manager")
    const addressRepo = manager.withRepository(
        addressRepository
    )
  
    const id = req.params.id;
    console.log(`Received request for coordinates of addressId: ${id}`);
  
}