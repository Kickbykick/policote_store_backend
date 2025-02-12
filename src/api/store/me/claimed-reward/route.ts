import type {
    MedusaRequest,
    MedusaResponse,
  } from "@medusajs/medusa"
import ClaimedRewardsService from "../../../../services/claimed-rewards"

interface ClaimRewardRequestBody {
  rewardId: string;
}

// POST
export const POST = async (
    req: MedusaRequest,
    res: MedusaResponse
) => {
    const id = req.user.customer_id
    const claimedRewardsService: ClaimedRewardsService = req.scope.resolve("claimedRewardsService");
    const { rewardId } = req.body as ClaimRewardRequestBody;

    try {
        const claimed_rewards = await claimedRewardsService.claimReward(id, rewardId);
        res.json({ claimed_rewards: claimed_rewards })
    } catch (error) {
        console.error("Error updating claimedReward:", error)
        res.status(500).json({ message: "Failed to update claimedReward", error: error.message })
    }
}