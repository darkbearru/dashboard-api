import { IUsersService } from './users.service.interface';
import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';
import { User } from './user.entity';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { IConfigService } from '../config/config.service.interface';

@injectable()
export class UsersService implements IUsersService {
	constructor(@inject(TYPES.IConfigService) private configService: IConfigService) {}

	async create({ name, email, password }: UserRegisterDto): Promise<User | null> {
		const newUser = new User(email, name);
		const salt = this.configService.get('SALT');
		console.log(salt);
		await newUser.setPassword(password, Number(salt));
		// Проверка если существует, то возвращаем null
		// Если нет то создаём
		return newUser;
	}

	async validateUser(dto: UserLoginDto): Promise<boolean> {
		return false;
	}
}
