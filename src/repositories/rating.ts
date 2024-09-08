import { dataSource } from "@medusajs/medusa/dist/loaders/database";
import { Rating } from "../models/rating";

export const RatingRepository = dataSource
  .getRepository(Rating)
  .extend({});

export default RatingRepository;
