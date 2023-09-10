export function inspect() {
  return function(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ){
    const origin = descriptor.value;

    descriptor.value = function(...args: any[]) {
      console.log(`--- Method ${propertyKey}`);
      console.log(`----- parameters: ${JSON.stringify(args)}`);
      const result = origin.apply(this, args);
      console.log(`----- return: ${JSON.stringify(result)}`);
      return result;
    }

    return descriptor;
  }
}