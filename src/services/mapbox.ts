import { TransactionBaseService } from "@medusajs/medusa"
import { MedusaError } from "medusa-core-utils"
import axios from "axios"
import * as dotenv from 'dotenv';
dotenv.config();

class MapboxService extends TransactionBaseService {
    static identifier = "mapbox"
    protected mapboxAccessToken: string;
    protected winnipegWarehouseLat: number;
    protected winnipegWarehouseLong: number;

    constructor(container) {
        super(container)
        this.mapboxAccessToken = process.env.MAPBOX_ACCESS_TOKEN
        this.winnipegWarehouseLat = parseFloat(process.env.WINNIPEG_WAREHOUSE_LAT)
        this.winnipegWarehouseLong = parseFloat(process.env.WINNIPEG_WAREHOUSE_LONG)

        if (!this.mapboxAccessToken) {
        throw new MedusaError(
            MedusaError.Types.INVALID_DATA,
            "Mapbox access token is required"
        )
        }

        if (!this.winnipegWarehouseLat || !this.winnipegWarehouseLong) {
        throw new MedusaError(
            MedusaError.Types.INVALID_DATA,
            "Store coordinates are required"
        )
        }
    }

    async geocodeAddress(address: string): Promise<{
        latitude: number
        longitude: number
    }> {
        try {
        const response = await axios.get(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
            address
            )}.json`,
            {
            params: {
                access_token: this.mapboxAccessToken,
                limit: 1,
            },
            }
        )

        if (!response.data.features || response.data.features.length === 0) {
            throw new MedusaError(
            MedusaError.Types.INVALID_DATA,
            "Address not found"
            )
        }

        const [longitude, latitude] = response.data.features[0].center

        return { latitude, longitude }
        } catch (error) {
        throw new MedusaError(
            MedusaError.Types.UNEXPECTED_STATE,
            "Error geocoding address"
        )
        }
    }

    private deg2rad(deg: number): number {
        return deg * (Math.PI / 180)
    }

    calculateDistanceManually(lat1: number, lon1: number, lat2: number, lon2: number): number {
        const R = 6371 // Earth's radius in km
        const dLat = this.deg2rad(lat2 - lat1)
        const dLon = this.deg2rad(lon2 - lon1)
        const a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(this.deg2rad(lat1)) *
            Math.cos(this.deg2rad(lat2)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2)
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
        return R * c // Distance in km
    }

    async calculateDistance(
        startLat: number, 
        startLng: number, 
        endLat: number, 
        endLng: number
    ): Promise<{
        distance: number  // in kilometers
        duration: number  // in seconds
    }> {
        try {
        const response = await axios.get(
            `https://api.mapbox.com/directions/v5/mapbox/driving/${startLng},${startLat};${endLng},${endLat}`,
            {
            params: {
                access_token: this.mapboxAccessToken,
                geometries: 'geojson',
            },
            }
        )

        if (!response.data.routes || response.data.routes.length === 0) {
            throw new MedusaError(
            MedusaError.Types.INVALID_DATA,
            "Unable to calculate route between points"
            )
        }

        const route = response.data.routes[0]
        return {
            distance: route.distance / 1000, // Convert meters to kilometers
            duration: route.duration,
        }
        } catch (error) {
        throw new MedusaError(
            MedusaError.Types.UNEXPECTED_STATE,
            "Error calculating distance"
        )
        }
    }

    async getDistanceToStore(
        latitude: number,
        longitude: number
    ): Promise<{
        distance: number  // in kilometers
        duration: number  // in seconds
    }> {
        return await this.calculateDistance(
        latitude,
        longitude,
        this.winnipegWarehouseLat,
        this.winnipegWarehouseLong
        )
    }
}

export default MapboxService