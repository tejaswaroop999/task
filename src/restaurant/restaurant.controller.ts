import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { Restaurant } from

'./restaurant.entity';

@Controller('restaurants')
export class RestaurantController {
constructor(private readonly restaurantService: RestaurantService) {}

@Post()
async addRestaurant(@Body() restaurantData: any) {
return this.restaurantService.addRestaurant(restaurantData);
}

@Get()
async search(@Query('query') query: string) {
return this.restaurantService.searchRestaurants(query);
}

// Add other endpoints as needed
}

