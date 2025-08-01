import type {
  MedusaRequest,
  MedusaResponse,
} from "@medusajs/medusa"
import ProfileService from "src/services/profile"

// POST - Create Profile for Particular profile
export const POST = async (
  req: MedusaRequest,
  res: MedusaResponse
) => {
  const profileService: ProfileService = req.scope.resolve("profileService")
  const id = req.user.userId

  try {
    const profile = await profileService.createProfileFromCustomerId(id);
    res.json({ profile: profile })
  } catch (error) {
    console.error("Error updating profile:", error)
    res.status(500).json({ message: "Failed to update profile", error: error.message })
  }
}

export const GET = async (
  req: MedusaRequest,
  res: MedusaResponse
) => {
  const profileService: ProfileService = req.scope.resolve("profileService")
  const id = req.user.userId

  try {
    const profile = await profileService.retrieveByCustomerId(id)
    res.json({ profile: profile })
  } catch (error) {
    console.error("Error retrieving profile:", error)
    res.status(500).json({ message: "Failed to retrieve profile", error: error.message })
  }
}

