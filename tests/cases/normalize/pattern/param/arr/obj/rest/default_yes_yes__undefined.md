# Preval test case

# default_yes_yes__undefined.md

> Normalize > Pattern > Param > Arr > Obj > Rest > Default yes yes  undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([{ ...x } = $({ a: 'fail' })] = $([{ a: 'pass2' }])) {
  return x;
}
$(f(undefined, 200));
`````

## Pre Normal

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let [{ ...x } = $({ a: 'fail' })] = tmpParamBare === undefined ? $([{ a: 'pass2' }]) : tmpParamBare;
  return x;
};
$(f(undefined, 200));
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
    const tmpCallCallee$1 = $;
    const tmpArrElement$1 = { a: 'pass2' };
    const tmpCalleeParam$1 = [tmpArrElement$1];
    bindingPatternArrRoot$1 = tmpCallCallee$1(tmpCalleeParam$1);
    const tmpReturnArg = tmpBranchingC(tmpParamBare$1, bindingPatternArrRoot$1, tmpIfTest$1);
    return tmpReturnArg;
  };
  const tmpBranchingB = function ($$0, $$1, $$2) {
    let tmpParamBare$2 = $$0;
    let bindingPatternArrRoot$2 = $$1;
    let tmpIfTest$2 = $$2;
    debugger;
    bindingPatternArrRoot$2 = tmpParamBare$2;
    const tmpReturnArg$1 = tmpBranchingC(tmpParamBare$2, bindingPatternArrRoot$2, tmpIfTest$2);
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function ($$0, $$1, $$2) {
    let tmpParamBare$3 = $$0;
    let bindingPatternArrRoot$3 = $$1;
    let tmpIfTest$3 = $$2;
    debugger;
    let arrPatternSplat$1 = [...bindingPatternArrRoot$3];
    let arrPatternBeforeDefault$1 = arrPatternSplat$1[0];
    let arrPatternStep$1 = undefined;
    const tmpIfTest$4 = arrPatternBeforeDefault$1 === undefined;
    const tmpBranchingA$1 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6) {
      let tmpParamBare$4 = $$0;
      let bindingPatternArrRoot$4 = $$1;
      let tmpIfTest$5 = $$2;
      let arrPatternSplat$2 = $$3;
      let arrPatternBeforeDefault$2 = $$4;
      let arrPatternStep$2 = $$5;
      let tmpIfTest$6 = $$6;
      debugger;
      const tmpCallCallee$3 = $;
      const tmpCalleeParam$3 = { a: 'fail' };
      arrPatternStep$2 = tmpCallCallee$3(tmpCalleeParam$3);
      const tmpReturnArg$2 = tmpBranchingC$1(
        tmpParamBare$4,
        bindingPatternArrRoot$4,
        tmpIfTest$5,
        arrPatternSplat$2,
        arrPatternBeforeDefault$2,
        arrPatternStep$2,
        tmpIfTest$6,
      );
      return tmpReturnArg$2;
    };
    const tmpBranchingB$1 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6) {
      let tmpParamBare$5 = $$0;
      let bindingPatternArrRoot$5 = $$1;
      let tmpIfTest$7 = $$2;
      let arrPatternSplat$3 = $$3;
      let arrPatternBeforeDefault$3 = $$4;
      let arrPatternStep$3 = $$5;
      let tmpIfTest$8 = $$6;
      debugger;
      arrPatternStep$3 = arrPatternBeforeDefault$3;
      const tmpReturnArg$3 = tmpBranchingC$1(
        tmpParamBare$5,
        bindingPatternArrRoot$5,
        tmpIfTest$7,
        arrPatternSplat$3,
        arrPatternBeforeDefault$3,
        arrPatternStep$3,
        tmpIfTest$8,
      );
      return tmpReturnArg$3;
    };
    const tmpBranchingC$1 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6) {
      let tmpParamBare$6 = $$0;
      let bindingPatternArrRoot$6 = $$1;
      let tmpIfTest$9 = $$2;
      let arrPatternSplat$4 = $$3;
      let arrPatternBeforeDefault$4 = $$4;
      let arrPatternStep$4 = $$5;
      let tmpIfTest$10 = $$6;
      debugger;
      const tmpCallCallee$4 = objPatternRest;
      const tmpCalleeParam$4 = arrPatternStep$4;
      const tmpCalleeParam$5 = [];
      const tmpCalleeParam$6 = undefined;
      let x$2 = tmpCallCallee$4(tmpCalleeParam$4, tmpCalleeParam$5, tmpCalleeParam$6);
      return x$2;
    };
    if (tmpIfTest$4) {
      const tmpReturnArg$4 = tmpBranchingA$1(
        tmpParamBare$3,
        bindingPatternArrRoot$3,
        tmpIfTest$3,
        arrPatternSplat$1,
        arrPatternBeforeDefault$1,
        arrPatternStep$1,
        tmpIfTest$4,
      );
      return tmpReturnArg$4;
    } else {
      const tmpReturnArg$5 = tmpBranchingB$1(
        tmpParamBare$3,
        bindingPatternArrRoot$3,
        tmpIfTest$3,
        arrPatternSplat$1,
        arrPatternBeforeDefault$1,
        arrPatternStep$1,
        tmpIfTest$4,
      );
      return tmpReturnArg$5;
    }
  };
  if (tmpIfTest) {
    const tmpReturnArg$6 = tmpBranchingA(tmpParamBare, bindingPatternArrRoot, tmpIfTest);
    return tmpReturnArg$6;
  } else {
    const tmpReturnArg$7 = tmpBranchingB(tmpParamBare, bindingPatternArrRoot, tmpIfTest);
    return tmpReturnArg$7;
  }
};
const tmpCallCallee$5 = $;
const tmpCalleeParam$7 = f(undefined, 200);
tmpCallCallee$5(tmpCalleeParam$7);
`````

## Output

`````js filename=intro
const f = function () {
  debugger;
  const tmpArrElement$1 = { a: 'pass2' };
  const tmpCalleeParam$1 = [tmpArrElement$1];
  const SSA_bindingPatternArrRoot$1 = $(tmpCalleeParam$1);
  const arrPatternSplat$1 = [...SSA_bindingPatternArrRoot$1];
  const arrPatternBeforeDefault$1 = arrPatternSplat$1[0];
  const tmpIfTest$4 = arrPatternBeforeDefault$1 === undefined;
  const tmpBranchingC$1 = function ($$0) {
    const arrPatternStep$4 = $$0;
    debugger;
    const tmpCalleeParam$5 = [];
    const x$2 = objPatternRest(arrPatternStep$4, tmpCalleeParam$5, undefined);
    return x$2;
  };
  if (tmpIfTest$4) {
    const tmpCalleeParam$4 = { a: 'fail' };
    const SSA_arrPatternStep$1 = $(tmpCalleeParam$4);
    const tmpReturnArg$1 = tmpBranchingC$1(SSA_arrPatternStep$1);
    return tmpReturnArg$1;
  } else {
    const tmpReturnArg$4 = tmpBranchingC$1(arrPatternBeforeDefault$1);
    return tmpReturnArg$4;
  }
};
const tmpCalleeParam$7 = f();
$(tmpCalleeParam$7);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: [{ a: '"pass2"' }]
 - 2: { a: '"pass2"' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
