/*
 * @Author: 小指
 * @Date: 2021-03-29 16:05:45
 * @LastEditTime: 2021-03-30 09:59:29
 * @LastEditors: 小指
 * @Description: 面向切面编程
 */
export default class AOP {
  ctx: Object;
  fnQueue: Function[];
  constructor(targetFn?: Function, ctx?: Object) {
    this.ctx = ctx || global;
    this.fnQueue = targetFn ? [targetFn.bind(ctx)] : [];
  }

  before(beforeFn: Function, ctx?: Object) {
    this.fnQueue.unshift(beforeFn.bind(ctx || this.ctx));

    return this;
  }

  after(afterFn: Function, ctx?: Object) {
    this.fnQueue.push(afterFn.bind(ctx || this.ctx));

    return this;
  }

  static create(targetFn?: Function, ctx?: Object) {
    return new AOP(targetFn, ctx || global);
  }

  async run() {
    const ret = [];
    let fn;
    while (fn = this.fnQueue.shift()) {
      const curRet = await fn();
      ret.push(curRet);
    }

    return ret;
  }
}