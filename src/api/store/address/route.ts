import type { 
  MedusaRequest, 
  MedusaResponse,
} from "@medusajs/medusa"
import AddressRepository from "src/repositories/address"
import AddressService from "src/services/address"
import { EntityManager } from "typeorm"

export const GET = async (
  req: MedusaRequest, 
  res: MedusaResponse
) => {
  const addressRepository: typeof AddressRepository = 
  req.scope.resolve(
    "addressRepository"
  )
  const addressService: AddressService = req.scope.resolve("addressService")
  const { addressId } = req.params;
  
  const coordinates = await addressService.getCoordinates(addressId)

  res.json(coordinates);
}

export const POST = async (
  req: MedusaRequest, 
  res: MedusaResponse
) => {
  const addressService: AddressService = req.scope.resolve("addressService")
  const { addressId } = req.params;
  
  try {
    const updated = await addressService.update(addressId, req.body)
    res.json({ address: updated })
  } catch (error) {
    console.error("Error updating address:", error)
    res.status(500).json({ message: "Failed to update readdressward", error: error.message })
  }
}