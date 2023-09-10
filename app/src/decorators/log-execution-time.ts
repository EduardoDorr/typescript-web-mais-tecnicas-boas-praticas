export function logExecutionTime(inSeconds: boolean = false) {
  return function(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ){
    const origin = descriptor.value;

    descriptor.value = function(...args: any[]) {
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
    }

    return descriptor;
  }
}