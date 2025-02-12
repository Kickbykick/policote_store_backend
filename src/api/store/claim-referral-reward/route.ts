import type {
    MedusaRequest,
    MedusaResponse,
  } from "@medusajs/medusa"
import ClaimedRewardsService from "../../../services/claimed-rewards"

interface ClaimRewardRequestBody {
    newCustomerId: string;
    referralCode: string;
}

// POST
export const POST = async (
    req: MedusaRequest,
    res: MedusaResponse
) => {
    const claimedRewardsService: ClaimedRewardsService = req.scope.resolve("claimedRewardsService");
    const { newCustomerId, referralCode } = req.body as ClaimRewardRequestBody;

    try {
        const claimed_rewards = await claimedRewardsService.claimReferralReward(newCustomerId, referralCode);
        res.json({ claimed_rewards: claimed_rewards })
    } catch (error) {
        console.error("Error updating claimedReward:", error)
        res.status(500).json({ message: "Failed to update claimedReward", error: error.message })
    }
}