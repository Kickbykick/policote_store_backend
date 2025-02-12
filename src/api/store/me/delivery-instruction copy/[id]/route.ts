

import type {
  MedusaRequest,
  MedusaResponse,
} from "@medusajs/medusa"
import AddressService from "src/services/address"

interface DeliveryInstructionBody { image_url?: string; description: string; }

// CREATE - Add new delivery instruction
export const POST = async (
  req: MedusaRequest,
  res: MedusaResponse
) => {
  const addressService: AddressService = req.scope.resolve("addressService")
  const deliveryOrderExtensionId  = req.params.id
  const instruction = req.body as DeliveryInstructionBody;

  try {
      const address = await addressService.addDeliveryInstruction(deliveryOrderExtensionId, instruction)
      res.json({ address })
  } catch (error) {
      console.error("Error adding delivery instruction:", error)
      res.status(500).json({ message: "Failed to add delivery instruction", error: error.message })
  }
}

// READ - Get address with delivery instructions
export const GET = async (
  req: MedusaRequest,
  res: MedusaResponse
) => {
  const addressService: AddressService = req.scope.resolve("addressService")
  const deliveryOrderExtensionId  = req.params.id

  try {
      const address = await addressService.retrieve(deliveryOrderExtensionId)
      res.json({ delivery_instructions: address.delivery_instructions })
  } catch (error) {
      console.error("Error retrieving delivery instructions:", error)
      res.status(500).json({ message: "Failed to retrieve delivery instructions", error: error.message })
  }
}

// UPDATE - Update specific delivery instruction
export const PUT = async (
  req: MedusaRequest,
  res: MedusaResponse
) => {
  const addressService: AddressService = req.scope.resolve("addressService")
  const deliveryOrderExtensionId  = req.params.id
  const { index } = req.query
  const instruction = req.body as DeliveryInstructionBody;

  try {
      const address = await addressService.updateDeliveryInstruction(deliveryOrderExtensionId, Number(index), instruction)
      res.json({ address })
  } catch (error) {
      console.error("Error updating delivery instruction:", error)
      res.status(500).json({ message: "Failed to update delivery instruction", error: error.message })
  }
}

// DELETE - Remove specific delivery instruction
export const DELETE = async (
  req: MedusaRequest,
  res: MedusaResponse
) => {
  const addressService: AddressService = req.scope.resolve("addressService")
  const deliveryOrderExtensionId  = req.params.id
  const { index } = req.query

  try {
      const address = await addressService.removeDeliveryInstruction(deliveryOrderExtensionId, Number(index))
      res.json({ address })
  } catch (error) {
      console.error("Error removing delivery instruction:", error)
      res.status(500).json({ message: "Failed to remove delivery instruction", error: error.message })
  }
}
