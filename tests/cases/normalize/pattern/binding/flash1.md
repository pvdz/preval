# Preval test case

# flash1.md

> Normalize > Pattern > Binding > Flash1
>
> https://twitter.com/buzyescayadev/status/1343866976939098113 

The actual case contains unnecessary complexity in defaults so those were replaced:

```js
const [[[[[[foo = (y = a??z)]= {...[a(a?.b)]}]]]]] = 1, {x: {...x}} = 1;
```

## Input

`````js filename=intro
function x([[[[[[foo = x] = y]]]]], {x: {...x}}) {}
`````

## Pre Normal

`````js filename=intro
let x = function ($$0, $$1) {
  const tmpParamBare = $$0;
  const tmpParamBare$1 = $$1;
  debugger;
  let [[[[[[foo = x$1] = y]]]]] = tmpParamBare;
  let {
    x: { ...x$1 },
  } = tmpParamBare$1;
};
`````

## Normalized

`````js filename=intro
let x = function ($$0, $$1) {
  const tmpParamBare = $$0;
  const tmpParamBare$1 = $$1;
  debugger;
  let bindingPatternArrRoot = tmpParamBare;
  let arrPatternSplat = [...bindingPatternArrRoot];
  let arrPatternStep = arrPatternSplat[0];
  let arrPatternSplat$1 = [...arrPatternStep];
  let arrPatternStep$1 = arrPatternSplat$1[0];
  let arrPatternSplat$2 = [...arrPatternStep$1];
  let arrPatternStep$2 = arrPatternSplat$2[0];
  let arrPatternSplat$3 = [...arrPatternStep$2];
  let arrPatternStep$3 = arrPatternSplat$3[0];
  let arrPatternSplat$4 = [...arrPatternStep$3];
  let arrPatternBeforeDefault = arrPatternSplat$4[0];
  let arrPatternStep$4 = undefined;
  const tmpIfTest = arrPatternBeforeDefault === undefined;
  const tmpBranchingA = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7, $$8, $$9, $$10, $$11, $$12, $$13, $$14) {
    let tmpParamBare$2 = $$0;
    let tmpParamBare$3 = $$1;
    let bindingPatternArrRoot$1 = $$2;
    let arrPatternSplat$6 = $$3;
    let arrPatternStep$5 = $$4;
    let arrPatternSplat$7 = $$5;
    let arrPatternStep$6 = $$6;
    let arrPatternSplat$8 = $$7;
    let arrPatternStep$7 = $$8;
    let arrPatternSplat$9 = $$9;
    let arrPatternStep$8 = $$10;
    let arrPatternSplat$10 = $$11;
    let arrPatternBeforeDefault$2 = $$12;
    let arrPatternStep$9 = $$13;
    let tmpIfTest$1 = $$14;
    debugger;
    arrPatternStep$9 = y;
    const tmpReturnArg = tmpBranchingC(
      tmpParamBare$2,
      tmpParamBare$3,
      bindingPatternArrRoot$1,
      arrPatternSplat$6,
      arrPatternStep$5,
      arrPatternSplat$7,
      arrPatternStep$6,
      arrPatternSplat$8,
      arrPatternStep$7,
      arrPatternSplat$9,
      arrPatternStep$8,
      arrPatternSplat$10,
      arrPatternBeforeDefault$2,
      arrPatternStep$9,
      tmpIfTest$1,
    );
    return tmpReturnArg;
  };
  const tmpBranchingB = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7, $$8, $$9, $$10, $$11, $$12, $$13, $$14) {
    let tmpParamBare$4 = $$0;
    let tmpParamBare$5 = $$1;
    let bindingPatternArrRoot$2 = $$2;
    let arrPatternSplat$11 = $$3;
    let arrPatternStep$10 = $$4;
    let arrPatternSplat$12 = $$5;
    let arrPatternStep$11 = $$6;
    let arrPatternSplat$13 = $$7;
    let arrPatternStep$12 = $$8;
    let arrPatternSplat$14 = $$9;
    let arrPatternStep$13 = $$10;
    let arrPatternSplat$15 = $$11;
    let arrPatternBeforeDefault$3 = $$12;
    let arrPatternStep$14 = $$13;
    let tmpIfTest$2 = $$14;
    debugger;
    arrPatternStep$14 = arrPatternBeforeDefault$3;
    const tmpReturnArg$1 = tmpBranchingC(
      tmpParamBare$4,
      tmpParamBare$5,
      bindingPatternArrRoot$2,
      arrPatternSplat$11,
      arrPatternStep$10,
      arrPatternSplat$12,
      arrPatternStep$11,
      arrPatternSplat$13,
      arrPatternStep$12,
      arrPatternSplat$14,
      arrPatternStep$13,
      arrPatternSplat$15,
      arrPatternBeforeDefault$3,
      arrPatternStep$14,
      tmpIfTest$2,
    );
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7, $$8, $$9, $$10, $$11, $$12, $$13, $$14) {
    let tmpParamBare$6 = $$0;
    let tmpParamBare$7 = $$1;
    let bindingPatternArrRoot$3 = $$2;
    let arrPatternSplat$16 = $$3;
    let arrPatternStep$15 = $$4;
    let arrPatternSplat$17 = $$5;
    let arrPatternStep$16 = $$6;
    let arrPatternSplat$18 = $$7;
    let arrPatternStep$17 = $$8;
    let arrPatternSplat$19 = $$9;
    let arrPatternStep$18 = $$10;
    let arrPatternSplat$20 = $$11;
    let arrPatternBeforeDefault$4 = $$12;
    let arrPatternStep$19 = $$13;
    let tmpIfTest$3 = $$14;
    debugger;
    let arrPatternSplat$21 = [...arrPatternStep$19];
    let arrPatternBeforeDefault$5 = arrPatternSplat$21[0];
    let foo$1 = undefined;
    const tmpIfTest$4 = arrPatternBeforeDefault$5 === undefined;
    const tmpBranchingA$1 = function (
      $$0,
      $$1,
      $$2,
      $$3,
      $$4,
      $$5,
      $$6,
      $$7,
      $$8,
      $$9,
      $$10,
      $$11,
      $$12,
      $$13,
      $$14,
      $$15,
      $$16,
      $$17,
      $$18,
    ) {
      let tmpParamBare$8 = $$0;
      let tmpParamBare$9 = $$1;
      let bindingPatternArrRoot$4 = $$2;
      let arrPatternSplat$22 = $$3;
      let arrPatternStep$20 = $$4;
      let arrPatternSplat$23 = $$5;
      let arrPatternStep$21 = $$6;
      let arrPatternSplat$24 = $$7;
      let arrPatternStep$22 = $$8;
      let arrPatternSplat$25 = $$9;
      let arrPatternStep$23 = $$10;
      let arrPatternSplat$26 = $$11;
      let arrPatternBeforeDefault$6 = $$12;
      let arrPatternStep$24 = $$13;
      let tmpIfTest$5 = $$14;
      let arrPatternSplat$27 = $$15;
      let arrPatternBeforeDefault$7 = $$16;
      let foo$2 = $$17;
      let tmpIfTest$6 = $$18;
      debugger;
      foo$2 = x$2;
      const tmpReturnArg$2 = tmpBranchingC$1(
        tmpParamBare$8,
        tmpParamBare$9,
        bindingPatternArrRoot$4,
        arrPatternSplat$22,
        arrPatternStep$20,
        arrPatternSplat$23,
        arrPatternStep$21,
        arrPatternSplat$24,
        arrPatternStep$22,
        arrPatternSplat$25,
        arrPatternStep$23,
        arrPatternSplat$26,
        arrPatternBeforeDefault$6,
        arrPatternStep$24,
        tmpIfTest$5,
        arrPatternSplat$27,
        arrPatternBeforeDefault$7,
        foo$2,
        tmpIfTest$6,
      );
      return tmpReturnArg$2;
    };
    const tmpBranchingB$1 = function (
      $$0,
      $$1,
      $$2,
      $$3,
      $$4,
      $$5,
      $$6,
      $$7,
      $$8,
      $$9,
      $$10,
      $$11,
      $$12,
      $$13,
      $$14,
      $$15,
      $$16,
      $$17,
      $$18,
    ) {
      let tmpParamBare$10 = $$0;
      let tmpParamBare$11 = $$1;
      let bindingPatternArrRoot$5 = $$2;
      let arrPatternSplat$28 = $$3;
      let arrPatternStep$25 = $$4;
      let arrPatternSplat$29 = $$5;
      let arrPatternStep$26 = $$6;
      let arrPatternSplat$30 = $$7;
      let arrPatternStep$27 = $$8;
      let arrPatternSplat$31 = $$9;
      let arrPatternStep$28 = $$10;
      let arrPatternSplat$32 = $$11;
      let arrPatternBeforeDefault$8 = $$12;
      let arrPatternStep$29 = $$13;
      let tmpIfTest$7 = $$14;
      let arrPatternSplat$33 = $$15;
      let arrPatternBeforeDefault$9 = $$16;
      let foo$3 = $$17;
      let tmpIfTest$8 = $$18;
      debugger;
      foo$3 = arrPatternBeforeDefault$9;
      const tmpReturnArg$3 = tmpBranchingC$1(
        tmpParamBare$10,
        tmpParamBare$11,
        bindingPatternArrRoot$5,
        arrPatternSplat$28,
        arrPatternStep$25,
        arrPatternSplat$29,
        arrPatternStep$26,
        arrPatternSplat$30,
        arrPatternStep$27,
        arrPatternSplat$31,
        arrPatternStep$28,
        arrPatternSplat$32,
        arrPatternBeforeDefault$8,
        arrPatternStep$29,
        tmpIfTest$7,
        arrPatternSplat$33,
        arrPatternBeforeDefault$9,
        foo$3,
        tmpIfTest$8,
      );
      return tmpReturnArg$3;
    };
    const tmpBranchingC$1 = function (
      $$0,
      $$1,
      $$2,
      $$3,
      $$4,
      $$5,
      $$6,
      $$7,
      $$8,
      $$9,
      $$10,
      $$11,
      $$12,
      $$13,
      $$14,
      $$15,
      $$16,
      $$17,
      $$18,
    ) {
      let tmpParamBare$12 = $$0;
      let tmpParamBare$13 = $$1;
      let bindingPatternArrRoot$6 = $$2;
      let arrPatternSplat$34 = $$3;
      let arrPatternStep$30 = $$4;
      let arrPatternSplat$35 = $$5;
      let arrPatternStep$31 = $$6;
      let arrPatternSplat$36 = $$7;
      let arrPatternStep$32 = $$8;
      let arrPatternSplat$37 = $$9;
      let arrPatternStep$33 = $$10;
      let arrPatternSplat$38 = $$11;
      let arrPatternBeforeDefault$10 = $$12;
      let arrPatternStep$34 = $$13;
      let tmpIfTest$9 = $$14;
      let arrPatternSplat$39 = $$15;
      let arrPatternBeforeDefault$11 = $$16;
      let foo$4 = $$17;
      let tmpIfTest$10 = $$18;
      debugger;
      let bindingPatternObjRoot = tmpParamBare$13;
      let objPatternNoDefault = bindingPatternObjRoot.x;
      const tmpCallCallee = objPatternRest;
      const tmpCalleeParam = objPatternNoDefault;
      const tmpCalleeParam$1 = [];
      const tmpCalleeParam$2 = undefined;
      let x$3 = tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1, tmpCalleeParam$2);
    };
    if (tmpIfTest$4) {
      const tmpReturnArg$4 = tmpBranchingA$1(
        tmpParamBare$6,
        tmpParamBare$7,
        bindingPatternArrRoot$3,
        arrPatternSplat$16,
        arrPatternStep$15,
        arrPatternSplat$17,
        arrPatternStep$16,
        arrPatternSplat$18,
        arrPatternStep$17,
        arrPatternSplat$19,
        arrPatternStep$18,
        arrPatternSplat$20,
        arrPatternBeforeDefault$4,
        arrPatternStep$19,
        tmpIfTest$3,
        arrPatternSplat$21,
        arrPatternBeforeDefault$5,
        foo$1,
        tmpIfTest$4,
      );
      return tmpReturnArg$4;
    } else {
      const tmpReturnArg$5 = tmpBranchingB$1(
        tmpParamBare$6,
        tmpParamBare$7,
        bindingPatternArrRoot$3,
        arrPatternSplat$16,
        arrPatternStep$15,
        arrPatternSplat$17,
        arrPatternStep$16,
        arrPatternSplat$18,
        arrPatternStep$17,
        arrPatternSplat$19,
        arrPatternStep$18,
        arrPatternSplat$20,
        arrPatternBeforeDefault$4,
        arrPatternStep$19,
        tmpIfTest$3,
        arrPatternSplat$21,
        arrPatternBeforeDefault$5,
        foo$1,
        tmpIfTest$4,
      );
      return tmpReturnArg$5;
    }
  };
  if (tmpIfTest) {
    const tmpReturnArg$6 = tmpBranchingA(
      tmpParamBare,
      tmpParamBare$1,
      bindingPatternArrRoot,
      arrPatternSplat,
      arrPatternStep,
      arrPatternSplat$1,
      arrPatternStep$1,
      arrPatternSplat$2,
      arrPatternStep$2,
      arrPatternSplat$3,
      arrPatternStep$3,
      arrPatternSplat$4,
      arrPatternBeforeDefault,
      arrPatternStep$4,
      tmpIfTest,
    );
    return tmpReturnArg$6;
  } else {
    const tmpReturnArg$7 = tmpBranchingB(
      tmpParamBare,
      tmpParamBare$1,
      bindingPatternArrRoot,
      arrPatternSplat,
      arrPatternStep,
      arrPatternSplat$1,
      arrPatternStep$1,
      arrPatternSplat$2,
      arrPatternStep$2,
      arrPatternSplat$3,
      arrPatternStep$3,
      arrPatternSplat$4,
      arrPatternBeforeDefault,
      arrPatternStep$4,
      tmpIfTest,
    );
    return tmpReturnArg$7;
  }
};
`````

## Output

`````js filename=intro

`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
