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
  const tmpBranchingA = function () {
    debugger;
    arrPatternStep$7 = y;
    const tmpReturnArg = tmpBranchingC();
    return tmpReturnArg;
  };
  const tmpBranchingB = function () {
    debugger;
    arrPatternStep$7 = arrPatternBeforeDefault;
    const tmpReturnArg$1 = tmpBranchingC();
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function () {
    debugger;
    arrPatternSplat$9 = [...arrPatternStep$7];
    arrPatternBeforeDefault$1 = arrPatternSplat$9[0];
    const tmpIfTest$1 = arrPatternBeforeDefault$1 === undefined;
    const tmpBranchingA$1 = function () {
      debugger;
      foo = x$1;
      const tmpReturnArg$3 = tmpBranchingC$1();
      return tmpReturnArg$3;
    };
    const tmpBranchingB$1 = function () {
      debugger;
      foo = arrPatternBeforeDefault$1;
      const tmpReturnArg$5 = tmpBranchingC$1();
      return tmpReturnArg$5;
    };
    const tmpBranchingC$1 = function () {
      debugger;
      const tmpAssignObjPatternRhs = tmpParamBare$1;
      const objPatternNoDefault = tmpAssignObjPatternRhs.x;
      const tmpCallCallee = objPatternRest;
      const tmpCalleeParam = objPatternNoDefault;
      const tmpCalleeParam$1 = [];
      const tmpCalleeParam$3 = undefined;
      x$1 = tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1, tmpCalleeParam$3);
      return undefined;
    };
    if (tmpIfTest$1) {
      const tmpReturnArg$7 = tmpBranchingA$1();
      return tmpReturnArg$7;
    } else {
      const tmpReturnArg$9 = tmpBranchingB$1();
      return tmpReturnArg$9;
    }
  };
  let arrPatternSplat$9 = undefined;
  let arrPatternBeforeDefault$1 = undefined;
  let foo = undefined;
  if (tmpIfTest) {
    const tmpReturnArg$11 = tmpBranchingA();
    return tmpReturnArg$11;
  } else {
    const tmpReturnArg$13 = tmpBranchingB();
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
