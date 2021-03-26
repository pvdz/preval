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
  let arrPatternSplat$3 = [...arrPatternStep$1];
  let arrPatternStep$3 = arrPatternSplat$3[0];
  let arrPatternSplat$5 = [...arrPatternStep$3];
  let arrPatternStep$5 = arrPatternSplat$5[0];
  let arrPatternSplat$7 = [...arrPatternStep$5];
  let arrPatternBeforeDefault = arrPatternSplat$7[0];
  let arrPatternStep$7 = undefined;
  const tmpIfTest = arrPatternBeforeDefault === undefined;
  const tmpBranchingA = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7, $$8, $$9, $$10, $$11, $$12, $$13, $$14) {
    let tmpParamBare$2 = $$0;
    let tmpParamBare$4 = $$1;
    let bindingPatternArrRoot$1 = $$2;
    let arrPatternSplat$11 = $$3;
    let arrPatternStep$9 = $$4;
    let arrPatternSplat$13 = $$5;
    let arrPatternStep$11 = $$6;
    let arrPatternSplat$15 = $$7;
    let arrPatternStep$13 = $$8;
    let arrPatternSplat$17 = $$9;
    let arrPatternStep$15 = $$10;
    let arrPatternSplat$19 = $$11;
    let arrPatternBeforeDefault$3 = $$12;
    let arrPatternStep$17 = $$13;
    let tmpIfTest$1 = $$14;
    debugger;
    arrPatternStep$17 = y;
    const tmpReturnArg = tmpBranchingC(
      tmpParamBare$2,
      tmpParamBare$4,
      bindingPatternArrRoot$1,
      arrPatternSplat$11,
      arrPatternStep$9,
      arrPatternSplat$13,
      arrPatternStep$11,
      arrPatternSplat$15,
      arrPatternStep$13,
      arrPatternSplat$17,
      arrPatternStep$15,
      arrPatternSplat$19,
      arrPatternBeforeDefault$3,
      arrPatternStep$17,
      tmpIfTest$1,
    );
    return tmpReturnArg;
  };
  const tmpBranchingB = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7, $$8, $$9, $$10, $$11, $$12, $$13, $$14) {
    let tmpParamBare$6 = $$0;
    let tmpParamBare$8 = $$1;
    let bindingPatternArrRoot$3 = $$2;
    let arrPatternSplat$21 = $$3;
    let arrPatternStep$19 = $$4;
    let arrPatternSplat$23 = $$5;
    let arrPatternStep$21 = $$6;
    let arrPatternSplat$25 = $$7;
    let arrPatternStep$23 = $$8;
    let arrPatternSplat$27 = $$9;
    let arrPatternStep$25 = $$10;
    let arrPatternSplat$29 = $$11;
    let arrPatternBeforeDefault$5 = $$12;
    let arrPatternStep$27 = $$13;
    let tmpIfTest$3 = $$14;
    debugger;
    arrPatternStep$27 = arrPatternBeforeDefault$5;
    const tmpReturnArg$1 = tmpBranchingC(
      tmpParamBare$6,
      tmpParamBare$8,
      bindingPatternArrRoot$3,
      arrPatternSplat$21,
      arrPatternStep$19,
      arrPatternSplat$23,
      arrPatternStep$21,
      arrPatternSplat$25,
      arrPatternStep$23,
      arrPatternSplat$27,
      arrPatternStep$25,
      arrPatternSplat$29,
      arrPatternBeforeDefault$5,
      arrPatternStep$27,
      tmpIfTest$3,
    );
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7, $$8, $$9, $$10, $$11, $$12, $$13, $$14) {
    let tmpParamBare$10 = $$0;
    let tmpParamBare$12 = $$1;
    let bindingPatternArrRoot$5 = $$2;
    let arrPatternSplat$31 = $$3;
    let arrPatternStep$29 = $$4;
    let arrPatternSplat$33 = $$5;
    let arrPatternStep$31 = $$6;
    let arrPatternSplat$35 = $$7;
    let arrPatternStep$33 = $$8;
    let arrPatternSplat$37 = $$9;
    let arrPatternStep$35 = $$10;
    let arrPatternSplat$39 = $$11;
    let arrPatternBeforeDefault$7 = $$12;
    let arrPatternStep$37 = $$13;
    let tmpIfTest$5 = $$14;
    debugger;
    let arrPatternSplat$41 = [...arrPatternStep$37];
    let arrPatternBeforeDefault$9 = arrPatternSplat$41[0];
    let foo$1 = undefined;
    const tmpIfTest$7 = arrPatternBeforeDefault$9 === undefined;
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
      let tmpParamBare$14 = $$0;
      let tmpParamBare$16 = $$1;
      let bindingPatternArrRoot$7 = $$2;
      let arrPatternSplat$43 = $$3;
      let arrPatternStep$39 = $$4;
      let arrPatternSplat$45 = $$5;
      let arrPatternStep$41 = $$6;
      let arrPatternSplat$47 = $$7;
      let arrPatternStep$43 = $$8;
      let arrPatternSplat$49 = $$9;
      let arrPatternStep$45 = $$10;
      let arrPatternSplat$51 = $$11;
      let arrPatternBeforeDefault$11 = $$12;
      let arrPatternStep$47 = $$13;
      let tmpIfTest$9 = $$14;
      let arrPatternSplat$53 = $$15;
      let arrPatternBeforeDefault$13 = $$16;
      let foo$3 = $$17;
      let tmpIfTest$11 = $$18;
      debugger;
      foo$3 = x$2;
      const tmpReturnArg$3 = tmpBranchingC$1(
        tmpParamBare$14,
        tmpParamBare$16,
        bindingPatternArrRoot$7,
        arrPatternSplat$43,
        arrPatternStep$39,
        arrPatternSplat$45,
        arrPatternStep$41,
        arrPatternSplat$47,
        arrPatternStep$43,
        arrPatternSplat$49,
        arrPatternStep$45,
        arrPatternSplat$51,
        arrPatternBeforeDefault$11,
        arrPatternStep$47,
        tmpIfTest$9,
        arrPatternSplat$53,
        arrPatternBeforeDefault$13,
        foo$3,
        tmpIfTest$11,
      );
      return tmpReturnArg$3;
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
      let tmpParamBare$18 = $$0;
      let tmpParamBare$20 = $$1;
      let bindingPatternArrRoot$9 = $$2;
      let arrPatternSplat$55 = $$3;
      let arrPatternStep$49 = $$4;
      let arrPatternSplat$57 = $$5;
      let arrPatternStep$51 = $$6;
      let arrPatternSplat$59 = $$7;
      let arrPatternStep$53 = $$8;
      let arrPatternSplat$61 = $$9;
      let arrPatternStep$55 = $$10;
      let arrPatternSplat$63 = $$11;
      let arrPatternBeforeDefault$15 = $$12;
      let arrPatternStep$57 = $$13;
      let tmpIfTest$13 = $$14;
      let arrPatternSplat$65 = $$15;
      let arrPatternBeforeDefault$17 = $$16;
      let foo$5 = $$17;
      let tmpIfTest$15 = $$18;
      debugger;
      foo$5 = arrPatternBeforeDefault$17;
      const tmpReturnArg$5 = tmpBranchingC$1(
        tmpParamBare$18,
        tmpParamBare$20,
        bindingPatternArrRoot$9,
        arrPatternSplat$55,
        arrPatternStep$49,
        arrPatternSplat$57,
        arrPatternStep$51,
        arrPatternSplat$59,
        arrPatternStep$53,
        arrPatternSplat$61,
        arrPatternStep$55,
        arrPatternSplat$63,
        arrPatternBeforeDefault$15,
        arrPatternStep$57,
        tmpIfTest$13,
        arrPatternSplat$65,
        arrPatternBeforeDefault$17,
        foo$5,
        tmpIfTest$15,
      );
      return tmpReturnArg$5;
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
      let tmpParamBare$22 = $$0;
      let tmpParamBare$24 = $$1;
      let bindingPatternArrRoot$11 = $$2;
      let arrPatternSplat$67 = $$3;
      let arrPatternStep$59 = $$4;
      let arrPatternSplat$69 = $$5;
      let arrPatternStep$61 = $$6;
      let arrPatternSplat$71 = $$7;
      let arrPatternStep$63 = $$8;
      let arrPatternSplat$73 = $$9;
      let arrPatternStep$65 = $$10;
      let arrPatternSplat$75 = $$11;
      let arrPatternBeforeDefault$19 = $$12;
      let arrPatternStep$67 = $$13;
      let tmpIfTest$17 = $$14;
      let arrPatternSplat$77 = $$15;
      let arrPatternBeforeDefault$21 = $$16;
      let foo$7 = $$17;
      let tmpIfTest$19 = $$18;
      debugger;
      let bindingPatternObjRoot = tmpParamBare$24;
      let objPatternNoDefault = bindingPatternObjRoot.x;
      const tmpCallCallee = objPatternRest;
      const tmpCalleeParam = objPatternNoDefault;
      const tmpCalleeParam$1 = [];
      const tmpCalleeParam$3 = undefined;
      let x$4 = tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1, tmpCalleeParam$3);
    };
    if (tmpIfTest$7) {
      const tmpReturnArg$7 = tmpBranchingA$1(
        tmpParamBare$10,
        tmpParamBare$12,
        bindingPatternArrRoot$5,
        arrPatternSplat$31,
        arrPatternStep$29,
        arrPatternSplat$33,
        arrPatternStep$31,
        arrPatternSplat$35,
        arrPatternStep$33,
        arrPatternSplat$37,
        arrPatternStep$35,
        arrPatternSplat$39,
        arrPatternBeforeDefault$7,
        arrPatternStep$37,
        tmpIfTest$5,
        arrPatternSplat$41,
        arrPatternBeforeDefault$9,
        foo$1,
        tmpIfTest$7,
      );
      return tmpReturnArg$7;
    } else {
      const tmpReturnArg$9 = tmpBranchingB$1(
        tmpParamBare$10,
        tmpParamBare$12,
        bindingPatternArrRoot$5,
        arrPatternSplat$31,
        arrPatternStep$29,
        arrPatternSplat$33,
        arrPatternStep$31,
        arrPatternSplat$35,
        arrPatternStep$33,
        arrPatternSplat$37,
        arrPatternStep$35,
        arrPatternSplat$39,
        arrPatternBeforeDefault$7,
        arrPatternStep$37,
        tmpIfTest$5,
        arrPatternSplat$41,
        arrPatternBeforeDefault$9,
        foo$1,
        tmpIfTest$7,
      );
      return tmpReturnArg$9;
    }
  };
  if (tmpIfTest) {
    const tmpReturnArg$11 = tmpBranchingA(
      tmpParamBare,
      tmpParamBare$1,
      bindingPatternArrRoot,
      arrPatternSplat,
      arrPatternStep,
      arrPatternSplat$1,
      arrPatternStep$1,
      arrPatternSplat$3,
      arrPatternStep$3,
      arrPatternSplat$5,
      arrPatternStep$5,
      arrPatternSplat$7,
      arrPatternBeforeDefault,
      arrPatternStep$7,
      tmpIfTest,
    );
    return tmpReturnArg$11;
  } else {
    const tmpReturnArg$13 = tmpBranchingB(
      tmpParamBare,
      tmpParamBare$1,
      bindingPatternArrRoot,
      arrPatternSplat,
      arrPatternStep,
      arrPatternSplat$1,
      arrPatternStep$1,
      arrPatternSplat$3,
      arrPatternStep$3,
      arrPatternSplat$5,
      arrPatternStep$5,
      arrPatternSplat$7,
      arrPatternBeforeDefault,
      arrPatternStep$7,
      tmpIfTest,
    );
    return tmpReturnArg$13;
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
