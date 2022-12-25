import { IUsersService } from './users.service.interface';
import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';
import { User } from './user.entity';
import { injectable } from 'inversify';

@injectable()
export class UsersService implements IUsersService {
	async create({ name, email, password }: UserRegisterDto): Promise<User | null> {
		const newUser = new User(email, name);
		await newUser.setPassword(password);
		// Проверка если существует, то возвращаем null
		// Если нет то создаём
		return newUser;
	}

	async validateUser(dto: UserLoginDto): Promise<boolean> {
		return false;
	}
}
