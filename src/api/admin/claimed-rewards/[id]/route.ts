import type {
    MedusaRequest,
    MedusaResponse,
  } from "@medusajs/medusa"
import ClaimedRewardsService from "../../../../services/claimed-rewards"

// GET
export const GET = async (
    req: MedusaRequest,
    res: MedusaResponse
  ) => {
    const claimedRewardsService: ClaimedRewardsService = req.scope.resolve("claimedRewardsService");
    const id = req.params.id
  
    try {
      const claimedReward = await claimedRewardsService.getClaimedRewardById(id);
      res.json({ claimedReward: claimedReward })
    } catch (error) {
      console.error("Error getting claimedReward:", error)
      res.status(500).json({ message: "Failed to get claimedReward", error: error.message })
    }
}