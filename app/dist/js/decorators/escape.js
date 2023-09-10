export function escape(target, propertyKey, descriptor) {
    const origin = descriptor.value;
    descriptor.value = function (...args) {
        let result = origin.apply(this, args);
        if (typeof result === 'string') {
            result = result.replace(/<script>[\s\S]*?<\/script>/, '');
        }
        return result;
    };
    return descriptor;
}
//# sourceMappingURL=escape.js.map