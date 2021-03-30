export default class AOP {
    ctx: Object;
    fnQueue: Function[];
    constructor(targetFn?: Function, ctx?: Object);
    before(beforeFn: Function, ctx?: Object): this;
    after(afterFn: Function, ctx?: Object): this;
    static create(targetFn?: Function, ctx?: Object): AOP;
    run(): Promise<any[]>;
}
