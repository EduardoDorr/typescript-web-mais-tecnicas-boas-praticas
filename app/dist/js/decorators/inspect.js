export function inspect() {
    return function (target, propertyKey, descriptor) {
        const origin = descriptor.value;
        descriptor.value = function (...args) {
            console.log(`--- Method ${propertyKey}`);
            console.log(`----- parameters: ${JSON.stringify(args)}`);
            const result = origin.apply(this, args);
            console.log(`----- return: ${JSON.stringify(result)}`);
            return result;
        };
        return descriptor;
    };
}
//# sourceMappingURL=inspect.js.map