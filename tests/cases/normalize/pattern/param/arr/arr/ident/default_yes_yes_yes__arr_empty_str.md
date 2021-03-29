# Preval test case

# default_yes_yes_yes__arr_empty_str.md

> Normalize > Pattern > Param > Arr > Arr > Ident > Default yes yes yes  arr empty str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([[x = $('pass')] = $(['fail2'])] = $(['fail3'])) {
  return x;
}
$(f(['', 4, 5], 200));
`````

## Pre Normal

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let [[x = $('pass')] = $(['fail2'])] = tmpParamBare === undefined ? $(['fail3']) : tmpParamBare;
  return x;
};
$(f(['', 4, 5], 200));
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
    const tmpCalleeParam$1 = ['fail3'];
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
    let arrPatternSplat$3 = [...bindingPatternArrRoot$5];
    let arrPatternBeforeDefault$3 = arrPatternSplat$3[0];
    let arrPatternStep$1 = undefined;
    const tmpIfTest$7 = arrPatternBeforeDefault$3 === undefined;
    const tmpBranchingA$1 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6) {
      let tmpParamBare$7 = $$0;
      let bindingPatternArrRoot$7 = $$1;
      let tmpIfTest$9 = $$2;
      let arrPatternSplat$7 = $$3;
      let arrPatternBeforeDefault$7 = $$4;
      let arrPatternStep$3 = $$5;
      let tmpIfTest$11 = $$6;
      debugger;
      const tmpCallCallee$5 = $;
      const tmpCalleeParam$5 = ['fail2'];
      arrPatternStep$3 = tmpCallCallee$5(tmpCalleeParam$5);
      const tmpReturnArg$3 = tmpBranchingC$1(
        tmpParamBare$7,
        bindingPatternArrRoot$7,
        tmpIfTest$9,
        arrPatternSplat$7,
        arrPatternBeforeDefault$7,
        arrPatternStep$3,
        tmpIfTest$11,
      );
      return tmpReturnArg$3;
    };
    const tmpBranchingB$1 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6) {
      let tmpParamBare$9 = $$0;
      let bindingPatternArrRoot$9 = $$1;
      let tmpIfTest$13 = $$2;
      let arrPatternSplat$9 = $$3;
      let arrPatternBeforeDefault$9 = $$4;
      let arrPatternStep$5 = $$5;
      let tmpIfTest$15 = $$6;
      debugger;
      arrPatternStep$5 = arrPatternBeforeDefault$9;
      const tmpReturnArg$5 = tmpBranchingC$1(
        tmpParamBare$9,
        bindingPatternArrRoot$9,
        tmpIfTest$13,
        arrPatternSplat$9,
        arrPatternBeforeDefault$9,
        arrPatternStep$5,
        tmpIfTest$15,
      );
      return tmpReturnArg$5;
    };
    const tmpBranchingC$1 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6) {
      let tmpParamBare$11 = $$0;
      let bindingPatternArrRoot$11 = $$1;
      let tmpIfTest$17 = $$2;
      let arrPatternSplat$11 = $$3;
      let arrPatternBeforeDefault$11 = $$4;
      let arrPatternStep$7 = $$5;
      let tmpIfTest$19 = $$6;
      debugger;
      let arrPatternSplat$13 = [...arrPatternStep$7];
      let arrPatternBeforeDefault$13 = arrPatternSplat$13[0];
      let x$3 = undefined;
      const tmpIfTest$21 = arrPatternBeforeDefault$13 === undefined;
      const tmpBranchingA$3 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7, $$8, $$9, $$10) {
        let tmpParamBare$13 = $$0;
        let bindingPatternArrRoot$13 = $$1;
        let tmpIfTest$23 = $$2;
        let arrPatternSplat$15 = $$3;
        let arrPatternBeforeDefault$15 = $$4;
        let arrPatternStep$9 = $$5;
        let tmpIfTest$25 = $$6;
        let arrPatternSplat$17 = $$7;
        let arrPatternBeforeDefault$17 = $$8;
        let x$5 = $$9;
        let tmpIfTest$27 = $$10;
        debugger;
        x$5 = $('pass');
        const tmpReturnArg$7 = tmpBranchingC$3(
          tmpParamBare$13,
          bindingPatternArrRoot$13,
          tmpIfTest$23,
          arrPatternSplat$15,
          arrPatternBeforeDefault$15,
          arrPatternStep$9,
          tmpIfTest$25,
          arrPatternSplat$17,
          arrPatternBeforeDefault$17,
          x$5,
          tmpIfTest$27,
        );
        return tmpReturnArg$7;
      };
      const tmpBranchingB$3 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7, $$8, $$9, $$10) {
        let tmpParamBare$15 = $$0;
        let bindingPatternArrRoot$15 = $$1;
        let tmpIfTest$29 = $$2;
        let arrPatternSplat$19 = $$3;
        let arrPatternBeforeDefault$19 = $$4;
        let arrPatternStep$11 = $$5;
        let tmpIfTest$31 = $$6;
        let arrPatternSplat$21 = $$7;
        let arrPatternBeforeDefault$21 = $$8;
        let x$7 = $$9;
        let tmpIfTest$33 = $$10;
        debugger;
        x$7 = arrPatternBeforeDefault$21;
        const tmpReturnArg$9 = tmpBranchingC$3(
          tmpParamBare$15,
          bindingPatternArrRoot$15,
          tmpIfTest$29,
          arrPatternSplat$19,
          arrPatternBeforeDefault$19,
          arrPatternStep$11,
          tmpIfTest$31,
          arrPatternSplat$21,
          arrPatternBeforeDefault$21,
          x$7,
          tmpIfTest$33,
        );
        return tmpReturnArg$9;
      };
      const tmpBranchingC$3 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7, $$8, $$9, $$10) {
        let tmpParamBare$17 = $$0;
        let bindingPatternArrRoot$17 = $$1;
        let tmpIfTest$35 = $$2;
        let arrPatternSplat$23 = $$3;
        let arrPatternBeforeDefault$23 = $$4;
        let arrPatternStep$13 = $$5;
        let tmpIfTest$37 = $$6;
        let arrPatternSplat$25 = $$7;
        let arrPatternBeforeDefault$25 = $$8;
        let x$9 = $$9;
        let tmpIfTest$39 = $$10;
        debugger;
        return x$9;
      };
      if (tmpIfTest$21) {
        const tmpReturnArg$11 = tmpBranchingA$3(
          tmpParamBare$11,
          bindingPatternArrRoot$11,
          tmpIfTest$17,
          arrPatternSplat$11,
          arrPatternBeforeDefault$11,
          arrPatternStep$7,
          tmpIfTest$19,
          arrPatternSplat$13,
          arrPatternBeforeDefault$13,
          x$3,
          tmpIfTest$21,
        );
        return tmpReturnArg$11;
      } else {
        const tmpReturnArg$13 = tmpBranchingB$3(
          tmpParamBare$11,
          bindingPatternArrRoot$11,
          tmpIfTest$17,
          arrPatternSplat$11,
          arrPatternBeforeDefault$11,
          arrPatternStep$7,
          tmpIfTest$19,
          arrPatternSplat$13,
          arrPatternBeforeDefault$13,
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
        arrPatternSplat$3,
        arrPatternBeforeDefault$3,
        arrPatternStep$1,
        tmpIfTest$7,
      );
      return tmpReturnArg$15;
    } else {
      const tmpReturnArg$17 = tmpBranchingB$1(
        tmpParamBare$5,
        bindingPatternArrRoot$5,
        tmpIfTest$5,
        arrPatternSplat$3,
        arrPatternBeforeDefault$3,
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
const tmpCallCallee$9 = f;
const tmpCalleeParam$9 = ['', 4, 5];
const tmpCalleeParam$11 = 200;
const tmpCalleeParam$7 = tmpCallCallee$9(tmpCalleeParam$9, tmpCalleeParam$11);
tmpCallCallee$7(tmpCalleeParam$7);
`````

## Output

`````js filename=intro
const tmpBranchingC = function ($$0) {
  const bindingPatternArrRoot$5 = $$0;
  debugger;
  const arrPatternSplat$3 = [...bindingPatternArrRoot$5];
  const arrPatternBeforeDefault$3 = arrPatternSplat$3[0];
  const tmpIfTest$7 = arrPatternBeforeDefault$3 === undefined;
  if (tmpIfTest$7) {
    const tmpCalleeParam$5 = ['fail2'];
    const SSA_arrPatternStep$3 = $(tmpCalleeParam$5);
    const tmpReturnArg$3 = tmpBranchingC$1(SSA_arrPatternStep$3);
    return tmpReturnArg$3;
  } else {
    const tmpReturnArg$17 = tmpBranchingC$1(arrPatternBeforeDefault$3);
    return tmpReturnArg$17;
  }
};
const tmpBranchingC$1 = function ($$0) {
  const arrPatternStep$7 = $$0;
  debugger;
  const arrPatternSplat$13 = [...arrPatternStep$7];
  const arrPatternBeforeDefault$13 = arrPatternSplat$13[0];
  const tmpIfTest$21 = arrPatternBeforeDefault$13 === undefined;
  if (tmpIfTest$21) {
    const tmpReturnArg$11 = $('pass');
    return tmpReturnArg$11;
  } else {
    return arrPatternBeforeDefault$13;
  }
};
const f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  const tmpIfTest = tmpParamBare === undefined;
  if (tmpIfTest) {
    const tmpCalleeParam$1 = ['fail3'];
    const SSA_bindingPatternArrRoot$1 = $(tmpCalleeParam$1);
    const tmpReturnArg = tmpBranchingC(SSA_bindingPatternArrRoot$1);
    return tmpReturnArg;
  } else {
    const tmpReturnArg$21 = tmpBranchingC(tmpParamBare);
    return tmpReturnArg$21;
  }
};
const tmpCalleeParam$9 = ['', 4, 5];
const tmpCalleeParam$7 = f(tmpCalleeParam$9);
$(tmpCalleeParam$7);
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
