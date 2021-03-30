# Preval test case

# default_yes_yes_yes__0.md

> Normalize > Pattern > Param > Arr > Obj > Ident > Default yes yes yes  0
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([{ x = $('pass') } = $({ x: 'fail2' })] = $([{ x: 'fail3' }])) {
  return 'bad';
}
$(f(0));
`````

## Pre Normal

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let [{ x: x = $('pass') } = $({ x: 'fail2' })] = tmpParamBare === undefined ? $([{ x: 'fail3' }]) : tmpParamBare;
  return 'bad';
};
$(f(0));
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
    const tmpArrElement$1 = { x: 'fail3' };
    const tmpCalleeParam$1 = [tmpArrElement$1];
    bindingPatternArrRoot$1 = tmpCallCallee$1(tmpCalleeParam$1);
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
    let arrPatternStep$1 = undefined;
    const tmpIfTest$7 = arrPatternBeforeDefault$1 === undefined;
    const tmpBranchingA$1 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6) {
      let tmpParamBare$7 = $$0;
      let bindingPatternArrRoot$7 = $$1;
      let tmpIfTest$9 = $$2;
      let arrPatternSplat$3 = $$3;
      let arrPatternBeforeDefault$3 = $$4;
      let arrPatternStep$3 = $$5;
      let tmpIfTest$11 = $$6;
      debugger;
      const tmpCallCallee$5 = $;
      const tmpCalleeParam$5 = { x: 'fail2' };
      arrPatternStep$3 = tmpCallCallee$5(tmpCalleeParam$5);
      const tmpReturnArg$3 = tmpBranchingC$1(
        tmpParamBare$7,
        bindingPatternArrRoot$7,
        tmpIfTest$9,
        arrPatternSplat$3,
        arrPatternBeforeDefault$3,
        arrPatternStep$3,
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
      let arrPatternStep$5 = $$5;
      let tmpIfTest$15 = $$6;
      debugger;
      arrPatternStep$5 = arrPatternBeforeDefault$5;
      const tmpReturnArg$5 = tmpBranchingC$1(
        tmpParamBare$9,
        bindingPatternArrRoot$9,
        tmpIfTest$13,
        arrPatternSplat$5,
        arrPatternBeforeDefault$5,
        arrPatternStep$5,
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
      let arrPatternStep$7 = $$5;
      let tmpIfTest$19 = $$6;
      debugger;
      let objPatternBeforeDefault$3 = arrPatternStep$7.x;
      let x$3 = undefined;
      const tmpIfTest$21 = objPatternBeforeDefault$3 === undefined;
      const tmpBranchingA$3 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7, $$8, $$9) {
        let tmpParamBare$13 = $$0;
        let bindingPatternArrRoot$13 = $$1;
        let tmpIfTest$23 = $$2;
        let arrPatternSplat$9 = $$3;
        let arrPatternBeforeDefault$9 = $$4;
        let arrPatternStep$9 = $$5;
        let tmpIfTest$25 = $$6;
        let objPatternBeforeDefault$5 = $$7;
        let x$5 = $$8;
        let tmpIfTest$27 = $$9;
        debugger;
        x$5 = $('pass');
        const tmpReturnArg$7 = tmpBranchingC$3(
          tmpParamBare$13,
          bindingPatternArrRoot$13,
          tmpIfTest$23,
          arrPatternSplat$9,
          arrPatternBeforeDefault$9,
          arrPatternStep$9,
          tmpIfTest$25,
          objPatternBeforeDefault$5,
          x$5,
          tmpIfTest$27,
        );
        return tmpReturnArg$7;
      };
      const tmpBranchingB$3 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7, $$8, $$9) {
        let tmpParamBare$15 = $$0;
        let bindingPatternArrRoot$15 = $$1;
        let tmpIfTest$29 = $$2;
        let arrPatternSplat$11 = $$3;
        let arrPatternBeforeDefault$11 = $$4;
        let arrPatternStep$11 = $$5;
        let tmpIfTest$31 = $$6;
        let objPatternBeforeDefault$7 = $$7;
        let x$7 = $$8;
        let tmpIfTest$33 = $$9;
        debugger;
        x$7 = objPatternBeforeDefault$7;
        const tmpReturnArg$9 = tmpBranchingC$3(
          tmpParamBare$15,
          bindingPatternArrRoot$15,
          tmpIfTest$29,
          arrPatternSplat$11,
          arrPatternBeforeDefault$11,
          arrPatternStep$11,
          tmpIfTest$31,
          objPatternBeforeDefault$7,
          x$7,
          tmpIfTest$33,
        );
        return tmpReturnArg$9;
      };
      const tmpBranchingC$3 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7, $$8, $$9) {
        let tmpParamBare$17 = $$0;
        let bindingPatternArrRoot$17 = $$1;
        let tmpIfTest$35 = $$2;
        let arrPatternSplat$13 = $$3;
        let arrPatternBeforeDefault$13 = $$4;
        let arrPatternStep$13 = $$5;
        let tmpIfTest$37 = $$6;
        let objPatternBeforeDefault$9 = $$7;
        let x$9 = $$8;
        let tmpIfTest$39 = $$9;
        debugger;
        return 'bad';
      };
      if (tmpIfTest$21) {
        const tmpReturnArg$11 = tmpBranchingA$3(
          tmpParamBare$11,
          bindingPatternArrRoot$11,
          tmpIfTest$17,
          arrPatternSplat$7,
          arrPatternBeforeDefault$7,
          arrPatternStep$7,
          tmpIfTest$19,
          objPatternBeforeDefault$3,
          x$3,
          tmpIfTest$21,
        );
        return tmpReturnArg$11;
      } else {
        const tmpReturnArg$13 = tmpBranchingB$3(
          tmpParamBare$11,
          bindingPatternArrRoot$11,
          tmpIfTest$17,
          arrPatternSplat$7,
          arrPatternBeforeDefault$7,
          arrPatternStep$7,
          tmpIfTest$19,
          objPatternBeforeDefault$3,
          x$3,
          tmpIfTest$21,
        );
        return tmpReturnArg$13;
      }
    };
    if (tmpIfTest$7) {
      const tmpReturnArg$15 = tmpBranchingA$1(
        tmpParamBare$5,
        bindingPatternArrRoot$5,
        tmpIfTest$5,
        arrPatternSplat$1,
        arrPatternBeforeDefault$1,
        arrPatternStep$1,
        tmpIfTest$7,
      );
      return tmpReturnArg$15;
    } else {
      const tmpReturnArg$17 = tmpBranchingB$1(
        tmpParamBare$5,
        bindingPatternArrRoot$5,
        tmpIfTest$5,
        arrPatternSplat$1,
        arrPatternBeforeDefault$1,
        arrPatternStep$1,
        tmpIfTest$7,
      );
      return tmpReturnArg$17;
    }
  };
  if (tmpIfTest) {
    const tmpReturnArg$19 = tmpBranchingA(tmpParamBare, bindingPatternArrRoot, tmpIfTest);
    return tmpReturnArg$19;
  } else {
    const tmpReturnArg$21 = tmpBranchingB(tmpParamBare, bindingPatternArrRoot, tmpIfTest);
    return tmpReturnArg$21;
  }
};
const tmpCallCallee$7 = $;
const tmpCalleeParam$7 = f(0);
tmpCallCallee$7(tmpCalleeParam$7);
`````

## Output

`````js filename=intro
const $clone$tmpBranchingC$0_D0 = function () {
  debugger;
  const arrPatternSplat$2 = [...0];
  const arrPatternBeforeDefault$2 = arrPatternSplat$2[0];
  const tmpIfTest$1 = arrPatternBeforeDefault$2 === undefined;
  if (tmpIfTest$1) {
    const tmpCalleeParam$2 = { x: 'fail2' };
    const tmpSSA_arrPatternStep$1 = $(tmpCalleeParam$2);
    const tmpReturnArg$1 = tmpBranchingC$1(tmpSSA_arrPatternStep$1);
    return tmpReturnArg$1;
  } else {
    const tmpReturnArg$4 = tmpBranchingC$1(arrPatternBeforeDefault$2);
    return tmpReturnArg$4;
  }
};
const tmpBranchingC$1 = function ($$0) {
  const arrPatternStep$7 = $$0;
  debugger;
  const objPatternBeforeDefault$3 = arrPatternStep$7.x;
  const tmpIfTest$21 = objPatternBeforeDefault$3 === undefined;
  if (tmpIfTest$21) {
    $('pass');
    return 'bad';
  } else {
    return 'bad';
  }
};
const tmpCalleeParam$7 = $clone$tmpBranchingC$0_D0();
$(tmpCalleeParam$7);
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
