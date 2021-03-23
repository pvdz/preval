# Preval test case

# default_yes_yes_no__undefined.md

> Normalize > Pattern > Param > Arr > Obj > Ident > Default yes yes no  undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([{ x = $('pass') } = $({ x: 'fail2' })]) {
  return 'bad';
}
$(f(undefined));
`````

## Pre Normal

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let [{ x = $('pass') } = $({ x: 'fail2' })] = tmpParamBare;
  return 'bad';
};
$(f(undefined));
`````

## Normalized

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let bindingPatternArrRoot = tmpParamBare;
  let arrPatternSplat = [...bindingPatternArrRoot];
  let arrPatternBeforeDefault = arrPatternSplat[0];
  let arrPatternStep = undefined;
  const tmpIfTest = arrPatternBeforeDefault === undefined;
  const tmpBranchingA = function ($$0, $$1, $$2, $$3, $$4, $$5) {
    let tmpParamBare$1 = $$0;
    let bindingPatternArrRoot$1 = $$1;
    let arrPatternSplat$1 = $$2;
    let arrPatternBeforeDefault$1 = $$3;
    let arrPatternStep$1 = $$4;
    let tmpIfTest$1 = $$5;
    debugger;
    const tmpCallCallee$1 = $;
    const tmpCalleeParam$1 = { x: 'fail2' };
    arrPatternStep$1 = tmpCallCallee$1(tmpCalleeParam$1);
    const tmpReturnArg = tmpBranchingC(
      tmpParamBare$1,
      bindingPatternArrRoot$1,
      arrPatternSplat$1,
      arrPatternBeforeDefault$1,
      arrPatternStep$1,
      tmpIfTest$1,
    );
    return tmpReturnArg;
  };
  const tmpBranchingB = function ($$0, $$1, $$2, $$3, $$4, $$5) {
    let tmpParamBare$2 = $$0;
    let bindingPatternArrRoot$2 = $$1;
    let arrPatternSplat$2 = $$2;
    let arrPatternBeforeDefault$2 = $$3;
    let arrPatternStep$2 = $$4;
    let tmpIfTest$2 = $$5;
    debugger;
    arrPatternStep$2 = arrPatternBeforeDefault$2;
    const tmpReturnArg$1 = tmpBranchingC(
      tmpParamBare$2,
      bindingPatternArrRoot$2,
      arrPatternSplat$2,
      arrPatternBeforeDefault$2,
      arrPatternStep$2,
      tmpIfTest$2,
    );
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function ($$0, $$1, $$2, $$3, $$4, $$5) {
    let tmpParamBare$3 = $$0;
    let bindingPatternArrRoot$3 = $$1;
    let arrPatternSplat$3 = $$2;
    let arrPatternBeforeDefault$3 = $$3;
    let arrPatternStep$3 = $$4;
    let tmpIfTest$3 = $$5;
    debugger;
    let objPatternBeforeDefault$1 = arrPatternStep$3.x;
    let x$1 = undefined;
    const tmpIfTest$4 = objPatternBeforeDefault$1 === undefined;
    const tmpBranchingA$1 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7, $$8) {
      let tmpParamBare$4 = $$0;
      let bindingPatternArrRoot$4 = $$1;
      let arrPatternSplat$4 = $$2;
      let arrPatternBeforeDefault$4 = $$3;
      let arrPatternStep$4 = $$4;
      let tmpIfTest$5 = $$5;
      let objPatternBeforeDefault$2 = $$6;
      let x$2 = $$7;
      let tmpIfTest$6 = $$8;
      debugger;
      x$2 = $('pass');
      const tmpReturnArg$2 = tmpBranchingC$1(
        tmpParamBare$4,
        bindingPatternArrRoot$4,
        arrPatternSplat$4,
        arrPatternBeforeDefault$4,
        arrPatternStep$4,
        tmpIfTest$5,
        objPatternBeforeDefault$2,
        x$2,
        tmpIfTest$6,
      );
      return tmpReturnArg$2;
    };
    const tmpBranchingB$1 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7, $$8) {
      let tmpParamBare$5 = $$0;
      let bindingPatternArrRoot$5 = $$1;
      let arrPatternSplat$5 = $$2;
      let arrPatternBeforeDefault$5 = $$3;
      let arrPatternStep$5 = $$4;
      let tmpIfTest$7 = $$5;
      let objPatternBeforeDefault$3 = $$6;
      let x$3 = $$7;
      let tmpIfTest$8 = $$8;
      debugger;
      x$3 = objPatternBeforeDefault$3;
      const tmpReturnArg$3 = tmpBranchingC$1(
        tmpParamBare$5,
        bindingPatternArrRoot$5,
        arrPatternSplat$5,
        arrPatternBeforeDefault$5,
        arrPatternStep$5,
        tmpIfTest$7,
        objPatternBeforeDefault$3,
        x$3,
        tmpIfTest$8,
      );
      return tmpReturnArg$3;
    };
    const tmpBranchingC$1 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7, $$8) {
      let tmpParamBare$6 = $$0;
      let bindingPatternArrRoot$6 = $$1;
      let arrPatternSplat$6 = $$2;
      let arrPatternBeforeDefault$6 = $$3;
      let arrPatternStep$6 = $$4;
      let tmpIfTest$9 = $$5;
      let objPatternBeforeDefault$4 = $$6;
      let x$4 = $$7;
      let tmpIfTest$10 = $$8;
      debugger;
      return 'bad';
    };
    if (tmpIfTest$4) {
      const tmpReturnArg$4 = tmpBranchingA$1(
        tmpParamBare$3,
        bindingPatternArrRoot$3,
        arrPatternSplat$3,
        arrPatternBeforeDefault$3,
        arrPatternStep$3,
        tmpIfTest$3,
        objPatternBeforeDefault$1,
        x$1,
        tmpIfTest$4,
      );
      return tmpReturnArg$4;
    } else {
      const tmpReturnArg$5 = tmpBranchingB$1(
        tmpParamBare$3,
        bindingPatternArrRoot$3,
        arrPatternSplat$3,
        arrPatternBeforeDefault$3,
        arrPatternStep$3,
        tmpIfTest$3,
        objPatternBeforeDefault$1,
        x$1,
        tmpIfTest$4,
      );
      return tmpReturnArg$5;
    }
  };
  if (tmpIfTest) {
    const tmpReturnArg$6 = tmpBranchingA(
      tmpParamBare,
      bindingPatternArrRoot,
      arrPatternSplat,
      arrPatternBeforeDefault,
      arrPatternStep,
      tmpIfTest,
    );
    return tmpReturnArg$6;
  } else {
    const tmpReturnArg$7 = tmpBranchingB(
      tmpParamBare,
      bindingPatternArrRoot,
      arrPatternSplat,
      arrPatternBeforeDefault,
      arrPatternStep,
      tmpIfTest,
    );
    return tmpReturnArg$7;
  }
};
const tmpCallCallee$2 = $;
const tmpCalleeParam$2 = f(undefined);
tmpCallCallee$2(tmpCalleeParam$2);
`````

## Output

`````js filename=intro
const f = function () {
  debugger;
  const arrPatternSplat = [...undefined];
  const arrPatternBeforeDefault = arrPatternSplat[0];
  const tmpIfTest = arrPatternBeforeDefault === undefined;
  const tmpBranchingC = function ($$0) {
    const arrPatternStep$3 = $$0;
    debugger;
    const objPatternBeforeDefault$1 = arrPatternStep$3.x;
    const tmpIfTest$4 = objPatternBeforeDefault$1 === undefined;
    if (tmpIfTest$4) {
      $('pass');
      return 'bad';
    } else {
      return 'bad';
    }
  };
  if (tmpIfTest) {
    const tmpCalleeParam$1 = { x: 'fail2' };
    const SSA_arrPatternStep$1 = $(tmpCalleeParam$1);
    const tmpReturnArg = tmpBranchingC(SSA_arrPatternStep$1);
    return tmpReturnArg;
  } else {
    const tmpReturnArg$7 = tmpBranchingC(arrPatternBeforeDefault);
    return tmpReturnArg$7;
  }
};
const tmpCalleeParam$2 = f();
$(tmpCalleeParam$2);
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
