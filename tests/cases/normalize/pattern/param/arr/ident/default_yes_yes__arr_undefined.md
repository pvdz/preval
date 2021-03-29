# Preval test case

# default_yes_yes__arr_undefined.md

> Normalize > Pattern > Param > Arr > Ident > Default yes yes  arr undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([x = $('pass')] = $('fail2')) {
  return x;
}
$(f([undefined, 201], 200));
`````

## Pre Normal

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let [x = $('pass')] = tmpParamBare === undefined ? $('fail2') : tmpParamBare;
  return x;
};
$(f([undefined, 201], 200));
`````

## Normalized

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let bindingPatternArrRoot = undefined;
  const tmpIfTest = tmpParamBare === undefined;
  const tmpBranchingA = function ($$0, $$1, $$2) {
    let tmpParamBare$1 = $$0;
    let bindingPatternArrRoot$1 = $$1;
    let tmpIfTest$1 = $$2;
    debugger;
    bindingPatternArrRoot$1 = $('fail2');
    const tmpReturnArg = tmpBranchingC(tmpParamBare$1, bindingPatternArrRoot$1, tmpIfTest$1);
    return tmpReturnArg;
  };
  const tmpBranchingB = function ($$0, $$1, $$2) {
    let tmpParamBare$3 = $$0;
    let bindingPatternArrRoot$3 = $$1;
    let tmpIfTest$3 = $$2;
    debugger;
    bindingPatternArrRoot$3 = tmpParamBare$3;
    const tmpReturnArg$1 = tmpBranchingC(tmpParamBare$3, bindingPatternArrRoot$3, tmpIfTest$3);
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function ($$0, $$1, $$2) {
    let tmpParamBare$5 = $$0;
    let bindingPatternArrRoot$5 = $$1;
    let tmpIfTest$5 = $$2;
    debugger;
    let arrPatternSplat$1 = [...bindingPatternArrRoot$5];
    let arrPatternBeforeDefault$1 = arrPatternSplat$1[0];
    let x$1 = undefined;
    const tmpIfTest$7 = arrPatternBeforeDefault$1 === undefined;
    const tmpBranchingA$1 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6) {
      let tmpParamBare$7 = $$0;
      let bindingPatternArrRoot$7 = $$1;
      let tmpIfTest$9 = $$2;
      let arrPatternSplat$3 = $$3;
      let arrPatternBeforeDefault$3 = $$4;
      let x$3 = $$5;
      let tmpIfTest$11 = $$6;
      debugger;
      x$3 = $('pass');
      const tmpReturnArg$3 = tmpBranchingC$1(
        tmpParamBare$7,
        bindingPatternArrRoot$7,
        tmpIfTest$9,
        arrPatternSplat$3,
        arrPatternBeforeDefault$3,
        x$3,
        tmpIfTest$11,
      );
      return tmpReturnArg$3;
    };
    const tmpBranchingB$1 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6) {
      let tmpParamBare$9 = $$0;
      let bindingPatternArrRoot$9 = $$1;
      let tmpIfTest$13 = $$2;
      let arrPatternSplat$5 = $$3;
      let arrPatternBeforeDefault$5 = $$4;
      let x$5 = $$5;
      let tmpIfTest$15 = $$6;
      debugger;
      x$5 = arrPatternBeforeDefault$5;
      const tmpReturnArg$5 = tmpBranchingC$1(
        tmpParamBare$9,
        bindingPatternArrRoot$9,
        tmpIfTest$13,
        arrPatternSplat$5,
        arrPatternBeforeDefault$5,
        x$5,
        tmpIfTest$15,
      );
      return tmpReturnArg$5;
    };
    const tmpBranchingC$1 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6) {
      let tmpParamBare$11 = $$0;
      let bindingPatternArrRoot$11 = $$1;
      let tmpIfTest$17 = $$2;
      let arrPatternSplat$7 = $$3;
      let arrPatternBeforeDefault$7 = $$4;
      let x$7 = $$5;
      let tmpIfTest$19 = $$6;
      debugger;
      return x$7;
    };
    if (tmpIfTest$7) {
      const tmpReturnArg$7 = tmpBranchingA$1(
        tmpParamBare$5,
        bindingPatternArrRoot$5,
        tmpIfTest$5,
        arrPatternSplat$1,
        arrPatternBeforeDefault$1,
        x$1,
        tmpIfTest$7,
      );
      return tmpReturnArg$7;
    } else {
      const tmpReturnArg$9 = tmpBranchingB$1(
        tmpParamBare$5,
        bindingPatternArrRoot$5,
        tmpIfTest$5,
        arrPatternSplat$1,
        arrPatternBeforeDefault$1,
        x$1,
        tmpIfTest$7,
      );
      return tmpReturnArg$9;
    }
  };
  if (tmpIfTest) {
    const tmpReturnArg$11 = tmpBranchingA(tmpParamBare, bindingPatternArrRoot, tmpIfTest);
    return tmpReturnArg$11;
  } else {
    const tmpReturnArg$13 = tmpBranchingB(tmpParamBare, bindingPatternArrRoot, tmpIfTest);
    return tmpReturnArg$13;
  }
};
const tmpCallCallee = $;
const tmpCallCallee$1 = f;
const tmpCalleeParam$1 = [undefined, 201];
const tmpCalleeParam$3 = 200;
const tmpCalleeParam = tmpCallCallee$1(tmpCalleeParam$1, tmpCalleeParam$3);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpBranchingC = function ($$0) {
  const bindingPatternArrRoot$5 = $$0;
  debugger;
  const arrPatternSplat$1 = [...bindingPatternArrRoot$5];
  const arrPatternBeforeDefault$1 = arrPatternSplat$1[0];
  const tmpIfTest$7 = arrPatternBeforeDefault$1 === undefined;
  if (tmpIfTest$7) {
    const tmpReturnArg$7 = $('pass');
    return tmpReturnArg$7;
  } else {
    return arrPatternBeforeDefault$1;
  }
};
const f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  const tmpIfTest = tmpParamBare === undefined;
  if (tmpIfTest) {
    const SSA_bindingPatternArrRoot$1 = $('fail2');
    const tmpReturnArg = tmpBranchingC(SSA_bindingPatternArrRoot$1);
    return tmpReturnArg;
  } else {
    const tmpReturnArg$13 = tmpBranchingC(tmpParamBare);
    return tmpReturnArg$13;
  }
};
const tmpCalleeParam$1 = [undefined, 201];
const tmpCalleeParam = f(tmpCalleeParam$1);
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'pass'
 - 2: 'pass'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
