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