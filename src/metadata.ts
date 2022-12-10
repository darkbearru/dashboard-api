import 'reflect-metadata';


function Test(target: Function) {
    Reflect.defineMetadata('a', 2, target);
    const meta = Reflect.getMetadata('a', target);
    console.log(meta);
}

function Prop (target: Object, name: string) {
    console.log(name);
}

function Injectable(key: string) {
    return (target: Function) => {
        Reflect.defineMetadata(key, 2, target);
    }
}

@Test
@Injectable('C')
class C {
    @Prop prop: number;
}