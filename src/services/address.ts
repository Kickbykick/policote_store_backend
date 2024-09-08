import { Address } from "src/models/address";
import { AddressRepository } from "../repositories/address";
import { MedusaError } from "medusa-core-utils";
import { TransactionBaseService } from "@medusajs/medusa";

type InjectedDependencies = {
  addressRepository: typeof AddressRepository;
};


class AddressService extends TransactionBaseService {
  protected readonly addressRepository_: typeof AddressRepository;

  constructor({ addressRepository }: InjectedDependencies) {
    super(arguments[0]);
    this.addressRepository_ = addressRepository;
  }

  async getCoordinates(addressId: string): Promise<{ longitude: number | null; latitude: number | null }> {
    try {
      return await this.addressRepository_.getCoordinates(addressId);
    } catch (error) {
      throw new MedusaError(MedusaError.Types.NOT_FOUND, `Address with ID ${addressId} not found`);
    }
  }

  async retrieve(addresId: string): Promise<Address> {
    const address = await this.addressRepository_.findById(addresId);
    if (!address) {
      throw new MedusaError(
        MedusaError.Types.NOT_FOUND,
        `Reward with id: ${addresId} was not found`
      );
    }
    return address;
  }

  async update(addressId: string, data: Partial<Address>): Promise<Address> {
    return await this.atomicPhase_(async (manager) => {
      const addressRepo = manager.withRepository(this.addressRepository_);
      const address = await this.retrieve(addressId);
      
      for (const [key, value] of Object.entries(data)) {
        if (value !== undefined) {
          address[key] = value;
        }
      }

      return await addressRepo.save(address);
    });
  }
}

export default AddressService;
