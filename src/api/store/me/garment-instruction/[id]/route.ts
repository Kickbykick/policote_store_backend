import type {
  MedusaRequest,
  MedusaResponse,
} from "@medusajs/medusa"
import DeliveryOrderExtensionService from "src/services/delivery-order-extension"

interface GarmentInstructionBody { image_url?: string; description: string; }

// CREATE - Add new garment instruction
export const POST = async (
  req: MedusaRequest,
  res: MedusaResponse
) => {
  const deliveryOrderExtensionService: DeliveryOrderExtensionService = req.scope.resolve("deliveryOrderExtensionService")
  const { id } = req.params
  const instruction = req.body as GarmentInstructionBody;

  try {
      const deliveryOrderExtension = await deliveryOrderExtensionService.addGarmentInstruction(id, instruction)
      res.json({ deliveryOrderExtension })
  } catch (error) {
      console.error("Error adding garment instruction:", error)
      res.status(500).json({ message: "Failed to add garment instruction", error: error.message })
  }
}

// READ - Get delivery order extension with garment instructions
export const GET = async (
  req: MedusaRequest,
  res: MedusaResponse
) => {
  const deliveryOrderExtensionService: DeliveryOrderExtensionService = req.scope.resolve("deliveryOrderExtensionService")
  const { id } = req.params

  try {
      const instructions = await deliveryOrderExtensionService.getGarmentInstructions(id)
      res.json({ garment_instructions: instructions })
  } catch (error) {
      console.error("Error retrieving garment instructions:", error)
      res.status(500).json({ message: "Failed to retrieve garment instructions", error: error.message })
  }
}

// UPDATE - Update specific garment instruction
export const PUT = async (
  req: MedusaRequest,
  res: MedusaResponse
) => {
  const deliveryOrderExtensionService: DeliveryOrderExtensionService = req.scope.resolve("deliveryOrderExtensionService")
  const { id } = req.params
  const { index } = req.query
  const instruction = req.body as GarmentInstructionBody;

  try {
      const deliveryOrderExtension = await deliveryOrderExtensionService.updateGarmentInstruction(id, Number(index), instruction)
      res.json({ delivery_order_extension: deliveryOrderExtension })
  } catch (error) {
      console.error("Error updating garment instruction:", error)
      res.status(500).json({ message: "Failed to update garment instruction", error: error.message })
  }
}

// DELETE - Remove specific garment instruction
export const DELETE = async (
  req: MedusaRequest,
  res: MedusaResponse
) => {
  const deliveryOrderExtensionService: DeliveryOrderExtensionService = req.scope.resolve("deliveryOrderExtensionService")
  const { id } = req.params
  const { index } = req.query

  try {
      const deliveryOrderExtension = await deliveryOrderExtensionService.removeGarmentInstruction(id, Number(index))
      res.json({ delivery_order_extension: deliveryOrderExtension })
  } catch (error) {
      console.error("Error removing garment instruction:", error)
      res.status(500).json({ message: "Failed to remove garment instruction", error: error.message })
  }
}
