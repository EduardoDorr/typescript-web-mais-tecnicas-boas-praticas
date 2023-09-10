export function domInject(inputElement) {
    return function (target, propertyKey, descriptor) {
        const origin = descriptor.value;
        descriptor.value = function (...args) {
            const result = origin.apply(this, args);
            return result;
        };
        return descriptor;
    };
}
