import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Restaurant } from './restaurant.entity';
import { RestaurantDto } from './restaurant.dto';
import Redis from 'ioredis';


@Injectable()
export class RestaurantService {
  private redisClient = new Redis(); // Default configuration

  constructor(
    @InjectRepository(Restaurant)
    private restaurantRepository: Repository<Restaurant>,
  ) {}
  async addRestaurant(restaurantData: RestaurantDto): Promise<Restaurant> {
    const newRestaurant = await this.restaurantRepository.save(restaurantData);
    // Invalidate relevant cache keys or update them as necessary
    // ...
    return newRestaurant;
  }

  
  async searchRestaurants(query: string): Promise<Restaurant[]> {
    // Check cache first
    const cached = await this.redisClient.get(query);
    if (cached) {
      return JSON.parse(cached);
    }

    // Fallback to database search
    const restaurants = await this.restaurantRepository
      .createQueryBuilder("restaurant")
      .where("restaurant.name ILIKE :query OR restaurant.location ILIKE :query", { query: `%${query}%` })
      .getMany();

    // Cache the result
    await this.redisClient.set(query, JSON.stringify(restaurants), 'EX', 3600); // Expires in 1 hour

    return restaurants;
  }

  // Implement other CRUD methods
}


