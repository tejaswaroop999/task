import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres', // your database type
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'tejaswaroop',
      database: 'newDB',
      entities: [],
      synchronize: true,
    }),
    // other modules
  ],
})
export class AppModule {}
 