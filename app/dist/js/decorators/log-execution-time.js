export function logExecutionTime(inSeconds = false) {
    return function (target, propertyKey, descriptor) {
        const origin = descriptor.value;
        descriptor.value = function (...args) {
            let divider = 1;
            let unit = 'ms';
            if (inSeconds) {
                divider = 1000;
                unit = 's';
            }
            const time1 = performance.now();
            const result = origin.apply(this, args);
            const time2 = performance.now();
            console.log(`Method: ${propertyKey}, Execution time: ${(time2 - time1) / divider} ${unit}.`);
            return result;
        };
        return descriptor;
    };
}
//# sourceMappingURL=log-execution-time.js.map