export class Utils {
  //naive extend, does not extend properties
    public static _Extend<T>(targetClass: {new(...args : any[]): T;}, dumbObject: any): T{
        return <T>(<any>Object).setPrototypeOf(dumbObject, targetClass.prototype);
    }
}