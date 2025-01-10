import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryController } from './controller/category.controller';
import { CategoryService } from './service/category.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entity/category.entity';
import { CategoryRepository } from './repository/category.repository';
import { ConfigModule } from '@nestjs/config';
import { EntryService } from './service/entry.service';
import { EntryRepository } from './repository/entry.repository';
import { PersonService } from './service/person.service';
import { PersonRepository } from './repository/person.repository';
import { UserService } from './service/user.service';
import { UserRepository } from './repository/user.repository';
import { Entry } from './entity/entry.entity';
import { Person } from './entity/person.entity';
import { User } from './entity/user.entity';
import { AuthGuard } from './auth.guard';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { UserController } from './controller/user.controller';
import { ErrorInterceptor } from './interceptors';
import { PersonController } from './controller/person.controller';
import { EntryController } from './controller/entry.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: '7d',
      },
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: false,
      useUTC: true,
      logging: true,
      ssl: true,
    }),
    TypeOrmModule.forFeature([Category, Entry, Person, User]),
  ],
  controllers: [
    AppController,
    UserController,
    CategoryController,
    PersonController,
    EntryController,
  ],
  providers: [
    AppService,
    CategoryService,
    { useClass: CategoryRepository, provide: 'CategoryRepositoryInterface' },
    EntryService,
    { useClass: EntryRepository, provide: 'EntryRepositoryInterface' },
    PersonService,
    { useClass: PersonRepository, provide: 'PersonRepositoryInterface' },
    UserService,
    { useClass: UserRepository, provide: 'UserRepositoryInterface' },
    { useClass: AuthGuard, provide: APP_GUARD },
    { useClass: ErrorInterceptor, provide: APP_INTERCEPTOR },
  ],
})
export class AppModule {}
