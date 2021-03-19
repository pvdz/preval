# Preval test case

# flash1.md

> Normalize > Pattern > Assignment > Flash1
>
> https://twitter.com/buzyescayadev/status/1343866976939098113 

The actual case contains unnecessary complexity in defaults so those were replaced:

```js
([[[[[[foo = (y = a??z)]= {...[a(a?.b)]}]]]]] = 1, {x: {...x}} = 1);
```

## Input

`````js filename=intro
function x([[[[[[foo = x] = y]]]]], {x: {...x}}) {}
`````

## Pre Normal

`````js filename=intro
let x = function (tmpParamPattern, tmpParamPattern$1) {
  let [[[[[[foo = x$1] = y]]]]] = tmpParamPattern;
  let {
    x: { ...x$1 },
  } = tmpParamPattern$1;
};
`````

## Normalized

`````js filename=intro
let x = function (tmpParamPattern, tmpParamPattern$1) {
  let bindingPatternArrRoot = tmpParamPattern;
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
  const tmpBranchingA = function (
    tmpParamPattern$2,
    tmpParamPattern$3,
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
  ) {
    arrPatternStep$9 = y;
    const tmpReturnArg = tmpBranchingC(
      tmpParamPattern$2,
      tmpParamPattern$3,
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
  const tmpBranchingB = function (
    tmpParamPattern$4,
    tmpParamPattern$5,
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
  ) {
    arrPatternStep$14 = arrPatternBeforeDefault$3;
    const tmpReturnArg$1 = tmpBranchingC(
      tmpParamPattern$4,
      tmpParamPattern$5,
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
  const tmpBranchingC = function (
    tmpParamPattern$6,
    tmpParamPattern$7,
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
  ) {
    let arrPatternSplat$21 = [...arrPatternStep$19];
    let arrPatternBeforeDefault$5 = arrPatternSplat$21[0];
    let foo$1 = undefined;
    const tmpIfTest$4 = arrPatternBeforeDefault$5 === undefined;
    const tmpBranchingA$1 = function (
      tmpParamPattern$8,
      tmpParamPattern$9,
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
    ) {
      foo$2 = x$2;
      const tmpReturnArg$2 = tmpBranchingC$1(
        tmpParamPattern$8,
        tmpParamPattern$9,
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
      tmpParamPattern$10,
      tmpParamPattern$11,
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
    ) {
      foo$3 = arrPatternBeforeDefault$9;
      const tmpReturnArg$3 = tmpBranchingC$1(
        tmpParamPattern$10,
        tmpParamPattern$11,
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
      tmpParamPattern$12,
      tmpParamPattern$13,
      bindingPatternArrRoot$6,
      arrPatternSplat$34,
      arrPatternStep$30,
      arrPatternSplat$35,
      arrPatternStep$31,
      arrPatternSplat$36,
      arrPatternStep$32,
      arrPatternSplat$37,
      arrPatternStep$33,
      arrPatternSplat$38,
      arrPatternBeforeDefault$10,
      arrPatternStep$34,
      tmpIfTest$9,
      arrPatternSplat$39,
      arrPatternBeforeDefault$11,
      foo$4,
      tmpIfTest$10,
    ) {
      let bindingPatternObjRoot = tmpParamPattern$13;
      let objPatternNoDefault = bindingPatternObjRoot.x;
      const tmpCallCallee = objPatternRest;
      const tmpCalleeParam = objPatternNoDefault;
      const tmpCalleeParam$1 = [];
      const tmpCalleeParam$2 = undefined;
      let x$3 = tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1, tmpCalleeParam$2);
    };
    if (tmpIfTest$4) {
      const tmpReturnArg$4 = tmpBranchingA$1(
        tmpParamPattern$6,
        tmpParamPattern$7,
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
        tmpParamPattern$6,
        tmpParamPattern$7,
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
      tmpParamPattern,
      tmpParamPattern$1,
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
      tmpParamPattern,
      tmpParamPattern$1,
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
