import { Module } from '@nestjs/common';
import { MoviesService } from './movies/movies.service';
import { MoviesModule } from './movies/movies.module';
import MoviesController from './movies/movies.controller';
import { AppController } from './app/app.controller';


@Module({
  imports: [MoviesModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
