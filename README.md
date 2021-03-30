# aop
javascript aop面向切面编程，完成顺序链式调用



## 快速使用

## 安装

```bash
npm i @qzz/aop
```

### 使用

```js
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
```



## API

### create(targetFn?: Function, ctx?: Object): AOP

创建aop实例，第一个参数为`执行函数`，第二个参数为`执行上下文对象`，均可选，执行上下文不传则默认为`global`

### before(beforeFn: Function, ctx?: Object): this

在调用链前插入函数，返回`this`用于链式调用

第一个参数为`执行函数`，必传

第二个参数为`执行上下文对象`，可选，执行上下文不传则默认为`create`获取的执行上下文

### after(afterFn: Function, ctx?: Object): this

在调用链后插入函数，返回`this`用于链式调用

第一个参数为`执行函数`，必传

第二个参数为`执行上下文对象`，可选，执行上下文不传则默认为`create`获取的执行上下文

### run(): Promise<any[]>

执行整个调用链，返回Promise，将`resolve`调用链每个函数的返回值组成的数组，无法在`run`函数后面继续链式调用。