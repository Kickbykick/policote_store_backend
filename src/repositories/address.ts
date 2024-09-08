import { 
  dataSource,
} from "@medusajs/medusa/dist/loaders/database"
import { AddressRepository as MedusaAddressRepository } from "@medusajs/medusa/dist/repositories/address"
import { Address } from "../models/address";

export const AddressRepository = dataSource
  .getRepository(Address)
  .extend({
    // it is important to spread the existing repository here.
    //  Otherwise you will end up losing core properties
    ...Object.assign(MedusaAddressRepository, {
      target: Address,
    }),

    /**
     * Retrieve the longitude and latitude for a given address ID.
     * @param addressId - The ID of the address.
     * @returns The longitude and latitude of the address.
     */
    async getCoordinates(addressId: string): Promise<{ longitude: number | null; latitude: number | null }> {
        try {
          const address = await this.findOne({
            where: { id: addressId },
            select: ['longitude', 'latitude']
          });
  
          if (!address) {
            throw new Error(`Address with ID ${addressId} not found`);
          }
  
          return {
            longitude: address.longitude,
            latitude: address.latitude,
          };
        } catch (error) {
          console.error(`Error retrieving coordinates: ${error.message}`);
          throw error;
        }
    },

    async findById(id: string): Promise<Address | null> {
      return this.findOne({ where: { id: id } });
    },
  })

export default AddressRepository