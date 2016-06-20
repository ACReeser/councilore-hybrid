export class Utils {
  //naive extend, does not extend properties
    public static _Extend<T>(targetClass: {new(...args : any[]): T;}, dumbObject: any): T{
        return <T>(<any>Object).setPrototypeOf(dumbObject, targetClass.prototype);
    }
    public static _ExtendObject<T>(source: T, dumbObject: any): T{
        for (var key in source) {
            dumbObject[key] = source[key];
        }
        return <T>dumbObject;        
    }
}