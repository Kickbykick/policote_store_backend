import type {
  MedusaRequest,
  MedusaResponse,
} from "@medusajs/medusa"
import DeliveryOrderExtensionService from "src/services/delivery-order-extension"

interface DriverInstructionBody { image_url?: string; description: string; }

// CREATE - Add new driver instruction
export const POST = async (
  req: MedusaRequest,
  res: MedusaResponse
) => {
  const deliveryOrderExtensionService: DeliveryOrderExtensionService = req.scope.resolve("deliveryOrderExtensionService")
  const { id } = req.params
  const instruction = req.body as DriverInstructionBody;

  try {
      const deliveryOrderExtension = await deliveryOrderExtensionService.addDriverInstruction(id, instruction)
      res.json({ deliveryOrderExtension })
  } catch (error) {
      console.error("Error adding driver instruction:", error)
      res.status(500).json({ message: "Failed to add driver instruction", error: error.message })
  }
}

// READ - Get delivery order extension with driver instructions
export const GET = async (
  req: MedusaRequest,
  res: MedusaResponse
) => {
  const deliveryOrderExtensionService: DeliveryOrderExtensionService = req.scope.resolve("deliveryOrderExtensionService")
  const { id } = req.params

  try {
      const instructions = await deliveryOrderExtensionService.getDriverInstructions(id)
      res.json({ driver_instructions: instructions })
  } catch (error) {
      console.error("Error retrieving driver instructions:", error)
      res.status(500).json({ message: "Failed to retrieve driver instructions", error: error.message })
  }
}

// UPDATE - Update specific driver instruction
export const PUT = async (
  req: MedusaRequest,
  res: MedusaResponse
) => {
  const deliveryOrderExtensionService: DeliveryOrderExtensionService = req.scope.resolve("deliveryOrderExtensionService")
  const { id } = req.params
  const { index } = req.query
  const instruction = req.body as DriverInstructionBody;

  try {
      const deliveryOrderExtension = await deliveryOrderExtensionService.updateDriverInstruction(id, Number(index), instruction)
      res.json({ delivery_order_extension: deliveryOrderExtension })
  } catch (error) {
      console.error("Error updating driver instruction:", error)
      res.status(500).json({ message: "Failed to update driver instruction", error: error.message })
  }
}

// DELETE - Remove specific driver instruction
export const DELETE = async (
  req: MedusaRequest,
  res: MedusaResponse
) => {
  const deliveryOrderExtensionService: DeliveryOrderExtensionService = req.scope.resolve("deliveryOrderExtensionService")
  const { id } = req.params
  const { index } = req.query

  try {
      const deliveryOrderExtension = await deliveryOrderExtensionService.removeDriverInstruction(id, Number(index))
      res.json({ delivery_order_extension: deliveryOrderExtension })
  } catch (error) {
      console.error("Error removing driver instruction:", error)
      res.status(500).json({ message: "Failed to remove driver instruction", error: error.message })
  }
}
