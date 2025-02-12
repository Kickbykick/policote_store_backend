import type {
    MedusaRequest,
    MedusaResponse,
} from "@medusajs/medusa"
import ServiceProviderService from "src/services/service-provider"

// GET /:id - Get single service provider
export const GET = async (
    req: MedusaRequest,
    res: MedusaResponse
) => {
    console.log("req params", req.params)
    const serviceProviderService: ServiceProviderService = req.scope.resolve("serviceProviderService")
    const serviceProvider = await serviceProviderService.retrieve(req.params.id)
    res.json({ service_provider: serviceProvider })
}

// POST /:profile_id - Create a new service provider
export const POST = async (
    req: MedusaRequest,
    res: MedusaResponse
) => {
    console.log("req params", req.params.id)
    const serviceProviderService: ServiceProviderService = req.scope.resolve("serviceProviderService")
    const created = await serviceProviderService.create(req.params.id, req.body)
    res.status(201).json({ service_provider: created })
}

// PUT /:id - Update a service provider
export const PUT = async (
    req: MedusaRequest,
    res: MedusaResponse
) => {
    const serviceProviderService: ServiceProviderService = req.scope.resolve("serviceProviderService")
    const updated = await serviceProviderService.update(req.params.id, req.body)
    res.json({ service_provider: updated })
}
  
// DELETE /:id - Delete a service provider
export const DELETE = async (
    req: MedusaRequest,
    res: MedusaResponse
) => {
    const serviceProviderService: ServiceProviderService = req.scope.resolve("serviceProviderService")
    await serviceProviderService.delete(req.params.id)
    res.status(200).json({ id: req.params.id, object: "service_provider", deleted: true })
}

export const AUTHENTICATE = true
