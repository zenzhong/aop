(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /*
     * @Author: 小指
     * @Date: 2021-03-29 16:05:45
     * @LastEditTime: 2021-03-30 09:59:29
     * @LastEditors: 小指
     * @Description: 面向切面编程
     */
    class AOP {
        constructor(targetFn, ctx) {
            this.ctx = ctx || global;
            this.fnQueue = targetFn ? [targetFn.bind(ctx)] : [];
        }
        before(beforeFn, ctx) {
            this.fnQueue.unshift(beforeFn.bind(ctx || this.ctx));
            return this;
        }
        after(afterFn, ctx) {
            this.fnQueue.push(afterFn.bind(ctx || this.ctx));
            return this;
        }
        static create(targetFn, ctx) {
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
    exports.default = AOP;
});
