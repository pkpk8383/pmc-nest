import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { HomeModule } from './modules/home/home.module';
import { AboutModule } from './modules/about/about.module';
import { ConsultingModule } from './modules/consulting/consulting.module';
import { CapacityBuildingModule } from './modules/capacity-building/capacity-building.module';
import { TechnologyModule } from './modules/technology/technology.module';
import { CareerModule } from './modules/career/career.module';
import { ContactModule } from './modules/contact/contact.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      serveRoot: '/',
      exclude: ['/about', '/consulting', '/capacity-building', '/technology', '/career', '/contact'],
    }),
    HomeModule,
    AboutModule,
    ConsultingModule,
    CapacityBuildingModule,
    TechnologyModule,
    CareerModule,
    ContactModule,
  ],
})
export class AppModule {}
