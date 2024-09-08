import { TransactionBaseService } from "@medusajs/medusa";
import { MedusaError } from "@medusajs/utils";
import CustomerRepository from "src/repositories/customer";
import DeliveryOrderExtensionRepository from "src/repositories/delivery-order-extension";
import { DeliveryOrderExtension } from "src/models/delivery-order-extension";
import RatingRepository from "src/repositories/rating";
import { Profile } from "src/models/profile";
import { Rating } from "src/models/rating";

class RatingService extends TransactionBaseService {
    protected readonly ratingRepository_: typeof RatingRepository;
    protected readonly deliveryOrderExtensionRepository_: typeof DeliveryOrderExtensionRepository;
    protected readonly customerRepository_: typeof CustomerRepository;

    constructor({ ratingRepository, deliveryOrderExtensionRepository, customerRepository, rewardRepository }) {
        super(arguments[0]);
        this.ratingRepository_ = ratingRepository;
        this.deliveryOrderExtensionRepository_ = deliveryOrderExtensionRepository;
        this.customerRepository_ = customerRepository;
    }

    async createRating(profile: Profile, delivery_order_extension: DeliveryOrderExtension, data: Partial<Rating>): Promise<Rating> {
        return await this.atomicPhase_(async (manager) => {
            const rating = this.ratingRepository_.create({
                profile: profile,
                delivery_order_extension: delivery_order_extension,
                ...data
            })
            return this.ratingRepository_.save(rating)
        })
    }

    async retrieve(rating_id: string): Promise<Rating> {
        const rating = await this.ratingRepository_.findOne({ where: { id: rating_id } })
        if (!rating) {
            throw new MedusaError(
                MedusaError.Types.NOT_FOUND,
                `Rating with id: ${rating_id} was not found`
            );
        }

        return rating;
    }

    async update(rating_id: string, data: Partial<Rating>): Promise<Rating> {
        return await this.atomicPhase_(async (manager) => {
            const rating = await this.retrieve(rating_id)

            this.ratingRepository_.merge(rating, data)
            return await this.ratingRepository_.save(rating)
        })
    }

    async delete(rating_id: string): Promise<void> {
        return await this.atomicPhase_(async (manager) => {
            const ratingRepo = manager.withRepository(this.ratingRepository_);
            const rating = await this.retrieve(rating_id);
            await ratingRepo.softRemove(rating);
        });
    }
}

export default RatingService;