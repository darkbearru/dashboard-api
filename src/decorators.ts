function Component(id: number) {
    console.log('init component');
    return (target: Function) => {
        console.log('Run component');
        target.prototype.id = id;
    }
}

function Logger() {
    console.log('init logger');
    return (target: Function) => {
        console.log('Run logger');
    }
}

function Method(target: Object, propertyKey: string, propertyDescriptor: PropertyDescriptor) {
    console.log(propertyKey);
    const oldValue = propertyDescriptor.value;
    propertyDescriptor.value = (...args: any[]) => {
        return args[0] * 10;
    }
}

function Prop(target: Object, propertyKey: string) {
    let value: number;

    const getter = () => {
        console.log('Get');
        return value;
    }

    const setter = (newValue: number) => {
        console.log('Set');
        value = newValue;
    }

    Object.defineProperty(target, propertyKey, {
        get: getter,
        set: setter
    })
}

function Param (target: Object, propertyKey: string, index: number) {
    console.log(propertyKey, index);
}

@Logger()
@Component(1)
export class User {
    @Prop id: number;

    @Method
    updateId(@Param newId: number): number {
        this.id = newId;
        return this.id;
    }
}

console.log(new User().id);
console.log(new User().updateId(2));