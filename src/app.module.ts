// import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { ConfigModule } from '@nestjs/config';
// import { UserModule } from './user/user.module';

// // @Module({
// //   imports: [
// //     ConfigModule.forRoot(),
// //     TypeOrmModule.forRoot({
// //       type: 'mysql',
// //       host: process.env.DB_HOST,
// //       port: +process.env.DB_PORT,
// //       username: process.env.DB_USER,
// //       password: process.env.DB_PASS,
// //       database: process.env.DB_NAME,
// //       autoLoadEntities: true,
// //       synchronize: true,
// //     }),
// //     UserModule,
// //   ],
// // })
// @Module({
//   imports: [
//     ConfigModule.forRoot(),
//     TypeOrmModule.forRoot({
//       type: 'postgres',
//       url: process.env.DATABASE_URL,
//       autoLoadEntities: true,
//       synchronize: true,
//       logging: true,
//     }),
//     UserModule,
//   ],
// })
// export class AppModule {}
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UserModule,
  ],
})
export class AppModule {}