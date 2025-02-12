import { TransactionBaseService } from "@medusajs/medusa";
import { MedusaError } from "@medusajs/utils";
import CustomerRepository from "src/repositories/customer";
import DeliveryOrderExtensionRepository from "src/repositories/delivery-order-extension";
import ProfileRepository from "src/repositories/profile";
import { DeliveryOrderExtension } from "src/models/delivery-order-extension";
import RatingRepository from "src/repositories/rating";
import { Profile } from "src/models/profile";
import { Rating } from "src/models/rating";
import ServiceProviderRepository from "src/repositories/service-provider";
import { ServiceProvider } from "src/models/service-provider";

class ServiceProviderService extends TransactionBaseService {
    protected readonly serviceProviderRepository_: typeof ServiceProviderRepository;
    protected readonly deliveryOrderExtensionRepository_: typeof DeliveryOrderExtensionRepository;
    protected readonly customerRepository_: typeof CustomerRepository;
    protected readonly profileRepository_: typeof ProfileRepository;

    constructor({ serviceProviderRepository, deliveryOrderExtensionRepository, customerRepository, profileRepository  }) {
        super(arguments[0]);
        this.serviceProviderRepository_ = serviceProviderRepository;
        this.deliveryOrderExtensionRepository_ = deliveryOrderExtensionRepository;
        this.customerRepository_ = customerRepository;
        this.profileRepository_ = profileRepository;
    }
    
    async list(): Promise<ServiceProvider[]> {
        return await this.atomicPhase_(async (manager) => {
            const serviceProviderRepo = manager.withRepository(this.serviceProviderRepository_)
            return await serviceProviderRepo.find({
                relations: ['profile', 'delivery_order_extension']
            })
        })
    }

    async create(profileId: string | null, data: Partial<ServiceProvider>): Promise<ServiceProvider> {
        return await this.atomicPhase_(async (manager) => {
            const serviceProviderRepo = manager.withRepository(this.serviceProviderRepository_);
            const profileRepo = manager.withRepository(this.profileRepository_);
            
            let profile = null;
            if (profileId) {
                profile = await profileRepo.findOne({ where: { id: profileId } });
                if (!profile) {
                    throw new MedusaError(
                        MedusaError.Types.NOT_FOUND,
                        `Profile with id: ${profileId} was not found`
                    );
                }
            }
    
            const serviceProvider = serviceProviderRepo.create({
                profile: profile,
                delivery_order_extension: [],
                ...data
            });
            
            return await serviceProviderRepo.save(serviceProvider);
        });
    }

    async retrieve(service_provider_id: string): Promise<ServiceProvider> {
        const service_provider = await this.serviceProviderRepository_.findOne({ where: { id: service_provider_id } })
        if (!service_provider) {
            throw new MedusaError(
                MedusaError.Types.NOT_FOUND,
                `ServiceProvider with id: ${service_provider_id} was not found`
            );
        }

        return service_provider;
    }

    async update(service_provider_id: string, data: Partial<ServiceProvider>): Promise<ServiceProvider> {
        return await this.atomicPhase_(async (manager) => {
            const service_provider = await this.retrieve(service_provider_id)
            this.serviceProviderRepository_.merge(service_provider, data)
            return await this.serviceProviderRepository_.save(service_provider)
        })
    }

    async delete(service_provider_id: string): Promise<void> {
        return await this.atomicPhase_(async (manager) => {
            const service_provider_repo = manager.withRepository(this.serviceProviderRepository_);
            const service_provider = await this.retrieve(service_provider_id);
            await service_provider_repo.softRemove(service_provider);
        });
    }
}

export default ServiceProviderService;