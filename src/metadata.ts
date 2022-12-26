import 'reflect-metadata';

function Test(target: Function): void {
	Reflect.defineMetadata('a', 2, target);
	const meta = Reflect.getMetadata('a', target);
	console.log(meta);
}

function Prop(target: Object, name: string): void {
	console.log(name);
}

function Injectable(key: string): Function {
	return (target: Function) => {
		Reflect.defineMetadata(key, 2, target);
	};
}

@Test
@Injectable('C')
class C {
	@Prop prop: number;
}
