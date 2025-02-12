import type {
  MedusaRequest,
  MedusaResponse,
} from "@medusajs/medusa"
import AddressService from "src/services/address"

interface PickupInstructionBody { image_url?: string; description: string; }

// CREATE - Add new pickup instruction
export const POST = async (
  req: MedusaRequest,
  res: MedusaResponse
) => {
  const addressService: AddressService = req.scope.resolve("addressService")
  const addressId  = req.params.id
  const instruction = req.body as PickupInstructionBody;

  try {
      const address = await addressService.addPickupInstruction(addressId, instruction)
      res.json({ address })
  } catch (error) {
      console.error("Error adding pickup instruction:", error)
      res.status(500).json({ message: "Failed to add pickup instruction", error: error.message })
  }
}

// READ - Get address with pickup instructions
export const GET = async (
  req: MedusaRequest,
  res: MedusaResponse
) => {
  const addressService: AddressService = req.scope.resolve("addressService")
  const addressId  = req.params.id

  try {
      const address = await addressService.retrieve(addressId)
      res.json({ pickup_instructions: address.pickup_instructions })
  } catch (error) {
      console.error("Error retrieving pickup instructions:", error)
      res.status(500).json({ message: "Failed to retrieve pickup instructions", error: error.message })
  }
}

// UPDATE - Update specific pickup instruction
export const PUT = async (
  req: MedusaRequest,
  res: MedusaResponse
) => {
  const addressService: AddressService = req.scope.resolve("addressService")
  const addressId  = req.params.id
  const { index } = req.query
  const instruction = req.body as PickupInstructionBody;

  try {
      const address = await addressService.updatePickupInstruction(addressId, Number(index), instruction)
      res.json({ address })
  } catch (error) {
      console.error("Error updating pickup instruction:", error)
      res.status(500).json({ message: "Failed to update pickup instruction", error: error.message })
  }
}

// DELETE - Remove specific pickup instruction
export const DELETE = async (
  req: MedusaRequest,
  res: MedusaResponse
) => {
  const addressService: AddressService = req.scope.resolve("addressService")
  const addressId  = req.params.id
  const { index } = req.query

  try {
      const address = await addressService.removePickupInstruction(addressId, Number(index))
      res.json({ address })
  } catch (error) {
      console.error("Error removing pickup instruction:", error)
      res.status(500).json({ message: "Failed to remove pickup instruction", error: error.message })
  }
}
