import { Injectable, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { neon } from '@neondatabase/serverless';
import * as bcrypt from 'bcrypt';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  private readonly sql = neon(process.env.DATABASE_URL);

  async register(userDto: UserDto): Promise<string> {
    const { email, password } = userDto;

    try {
      const existingUser = await this.sql`SELECT * FROM "user" WHERE "email" = ${email}`;
      if (existingUser.length > 0) {
        throw new ConflictException('Email already exists');
      }

      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);

      await this.sql`
        INSERT INTO "user" (email, password, created_at)
        VALUES (${email}, ${hashedPassword}, NOW())
      `;
      return 'User registered successfully';
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      } else {
        throw new InternalServerErrorException('Failed to register user');
      }
    }
  }

  async find(): Promise<any> {
    try {
      return await this.sql`SELECT "id", "email", "password", "created_at" FROM "user"`;
    } catch (error) {
      console.error(`Error fetching users: ${error.message}`);
      throw new InternalServerErrorException('Failed to retrieve users');
    }
  }
}