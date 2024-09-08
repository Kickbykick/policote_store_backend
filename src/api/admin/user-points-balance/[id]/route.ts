import type {
    MedusaRequest,
    MedusaResponse,
  } from "@medusajs/medusa"
  import RewardService from "../../../../services/reward"
import UserPointsBalanceService from "../../../../services/user-points-balance"

// GET - Create Profile for Particular profile
export const GET = async (
    req: MedusaRequest,
    res: MedusaResponse
) => {
  const userPointsBalanceService: UserPointsBalanceService = req.scope.resolve("userPointsBalanceService")
  const { id } = req.params

  try {
    const userPointsBalance = await userPointsBalanceService.getCustomerPointsAndRewards(id);
    res.json({ userPointsBalance: userPointsBalance })
  } catch (error) {
    console.error("Error updating userPointsBalance:", error)
    res.status(500).json({ message: "Failed to update userPointsBalance", error: error.message })
  }
}
