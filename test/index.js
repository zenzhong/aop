/*
 * @Author: 小指
 * @Date: 2021-03-30 09:24:52
 * @LastEditTime: 2021-03-30 09:47:02
 * @LastEditors: 小指
 * @Description: 测试
 */
function targetFn() {
  console.log('wait 2s...');
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(2);
      resolve(2);
    }, 2000);
  });
}

const beforeCtx = {
  data: 1,
  beforeFn() {
    console.log('wait 1s...');
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(this.data);
        resolve(this.data);
      }, 1000);
    });
  }
}

const afterCtx = {
  data: 3,
    afterFn(time) {
    console.log(`wait ${time}ms...`);
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(this.data);
        resolve(this.data);
      }, time);
    });
  }
}

function moreAfterFn() {
  console.log('Finished');
}

const AOP = require('../lib/index').default;
async function test() {
  // 链式调用
  const aopIns = AOP.create(targetFn)
    .before(beforeCtx.beforeFn, beforeCtx)
    .after(() => afterCtx.afterFn(1000), afterCtx);

  aopIns.after(moreAfterFn);

  const runRet = await aopIns.run();

  console.log('返回值列表:', runRet);
}

test();