import type {
    MedusaRequest,
    MedusaResponse,
  } from "@medusajs/medusa"
  import RewardService from "../../../../services/reward"
  
// GET - Retrieve a specific reward
export const GET = async (
    req: MedusaRequest,
    res: MedusaResponse
) => {
    const rewardService: RewardService = req.scope.resolve("rewardService")
    const id = req.params.id
  
    const reward = await rewardService.retrieve(id)
  
    res.json({ reward })
}
  
// POST - Update a specific reward
// Always add "name" to the 
export const POST = async (
    req: MedusaRequest,
    res: MedusaResponse
) => {
    const rewardService: RewardService = req.scope.resolve("rewardService")
    const { id } = req.params
  
    try {
      console.log("Update Reward API")
      const updated = await rewardService.update(id, req.body)
      res.json({ reward: updated })
    } catch (error) {
      console.error("Error updating reward:", error)
      res.status(500).json({ message: "Failed to update reward", error: error.message })
    }
}

// DELETE - Delete a specific reward
export const DELETE = async (
    req: MedusaRequest,
    res: MedusaResponse
) => {
    const rewardService: RewardService = req.scope.resolve("rewardService")
    const { id } = req.params

    await rewardService.delete(id)

    res.json({ "success": true, "id": id })
}