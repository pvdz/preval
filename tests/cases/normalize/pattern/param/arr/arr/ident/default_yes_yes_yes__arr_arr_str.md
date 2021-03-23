# Preval test case

# default_yes_yes_yes__arr_arr_str.md

> Normalize > Pattern > Param > Arr > Arr > Ident > Default yes yes yes  arr arr str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([[x = $('fail')] = $(['fail2'])] = $(['fail3'])) {
  return x;
}
$(f([['abc', 201], 4, 5], 200));
`````

## Pre Normal

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let [[x = $('fail')] = $(['fail2'])] = tmpParamBare === undefined ? $(['fail3']) : tmpParamBare;
  return x;
};
$(f([['abc', 201], 4, 5], 200));
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
    let arrPatternSplat$2 = [...bindingPatternArrRoot$3];
    let arrPatternBeforeDefault$2 = arrPatternSplat$2[0];
    let arrPatternStep$1 = undefined;
    const tmpIfTest$4 = arrPatternBeforeDefault$2 === undefined;
    const tmpBranchingA$1 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6) {
      let tmpParamBare$4 = $$0;
      let bindingPatternArrRoot$4 = $$1;
      let tmpIfTest$5 = $$2;
      let arrPatternSplat$4 = $$3;
      let arrPatternBeforeDefault$4 = $$4;
      let arrPatternStep$2 = $$5;
      let tmpIfTest$6 = $$6;
      debugger;
      const tmpCallCallee$3 = $;
      const tmpCalleeParam$3 = ['fail2'];
      arrPatternStep$2 = tmpCallCallee$3(tmpCalleeParam$3);
      const tmpReturnArg$2 = tmpBranchingC$1(
        tmpParamBare$4,
        bindingPatternArrRoot$4,
        tmpIfTest$5,
        arrPatternSplat$4,
        arrPatternBeforeDefault$4,
        arrPatternStep$2,
        tmpIfTest$6,
      );
      return tmpReturnArg$2;
    };
    const tmpBranchingB$1 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6) {
      let tmpParamBare$5 = $$0;
      let bindingPatternArrRoot$5 = $$1;
      let tmpIfTest$7 = $$2;
      let arrPatternSplat$5 = $$3;
      let arrPatternBeforeDefault$5 = $$4;
      let arrPatternStep$3 = $$5;
      let tmpIfTest$8 = $$6;
      debugger;
      arrPatternStep$3 = arrPatternBeforeDefault$5;
      const tmpReturnArg$3 = tmpBranchingC$1(
        tmpParamBare$5,
        bindingPatternArrRoot$5,
        tmpIfTest$7,
        arrPatternSplat$5,
        arrPatternBeforeDefault$5,
        arrPatternStep$3,
        tmpIfTest$8,
      );
      return tmpReturnArg$3;
    };
    const tmpBranchingC$1 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6) {
      let tmpParamBare$6 = $$0;
      let bindingPatternArrRoot$6 = $$1;
      let tmpIfTest$9 = $$2;
      let arrPatternSplat$6 = $$3;
      let arrPatternBeforeDefault$6 = $$4;
      let arrPatternStep$4 = $$5;
      let tmpIfTest$10 = $$6;
      debugger;
      let arrPatternSplat$7 = [...arrPatternStep$4];
      let arrPatternBeforeDefault$7 = arrPatternSplat$7[0];
      let x$2 = undefined;
      const tmpIfTest$11 = arrPatternBeforeDefault$7 === undefined;
      const tmpBranchingA$2 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7, $$8, $$9, $$10) {
        let tmpParamBare$7 = $$0;
        let bindingPatternArrRoot$7 = $$1;
        let tmpIfTest$12 = $$2;
        let arrPatternSplat$8 = $$3;
        let arrPatternBeforeDefault$8 = $$4;
        let arrPatternStep$5 = $$5;
        let tmpIfTest$13 = $$6;
        let arrPatternSplat$9 = $$7;
        let arrPatternBeforeDefault$9 = $$8;
        let x$3 = $$9;
        let tmpIfTest$14 = $$10;
        debugger;
        x$3 = $('fail');
        const tmpReturnArg$4 = tmpBranchingC$2(
          tmpParamBare$7,
          bindingPatternArrRoot$7,
          tmpIfTest$12,
          arrPatternSplat$8,
          arrPatternBeforeDefault$8,
          arrPatternStep$5,
          tmpIfTest$13,
          arrPatternSplat$9,
          arrPatternBeforeDefault$9,
          x$3,
          tmpIfTest$14,
        );
        return tmpReturnArg$4;
      };
      const tmpBranchingB$2 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7, $$8, $$9, $$10) {
        let tmpParamBare$8 = $$0;
        let bindingPatternArrRoot$8 = $$1;
        let tmpIfTest$15 = $$2;
        let arrPatternSplat$10 = $$3;
        let arrPatternBeforeDefault$10 = $$4;
        let arrPatternStep$6 = $$5;
        let tmpIfTest$16 = $$6;
        let arrPatternSplat$11 = $$7;
        let arrPatternBeforeDefault$11 = $$8;
        let x$4 = $$9;
        let tmpIfTest$17 = $$10;
        debugger;
        x$4 = arrPatternBeforeDefault$11;
        const tmpReturnArg$5 = tmpBranchingC$2(
          tmpParamBare$8,
          bindingPatternArrRoot$8,
          tmpIfTest$15,
          arrPatternSplat$10,
          arrPatternBeforeDefault$10,
          arrPatternStep$6,
          tmpIfTest$16,
          arrPatternSplat$11,
          arrPatternBeforeDefault$11,
          x$4,
          tmpIfTest$17,
        );
        return tmpReturnArg$5;
      };
      const tmpBranchingC$2 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7, $$8, $$9, $$10) {
        let tmpParamBare$9 = $$0;
        let bindingPatternArrRoot$9 = $$1;
        let tmpIfTest$18 = $$2;
        let arrPatternSplat$12 = $$3;
        let arrPatternBeforeDefault$12 = $$4;
        let arrPatternStep$7 = $$5;
        let tmpIfTest$19 = $$6;
        let arrPatternSplat$13 = $$7;
        let arrPatternBeforeDefault$13 = $$8;
        let x$5 = $$9;
        let tmpIfTest$20 = $$10;
        debugger;
        return x$5;
      };
      if (tmpIfTest$11) {
        const tmpReturnArg$6 = tmpBranchingA$2(
          tmpParamBare$6,
          bindingPatternArrRoot$6,
          tmpIfTest$9,
          arrPatternSplat$6,
          arrPatternBeforeDefault$6,
          arrPatternStep$4,
          tmpIfTest$10,
          arrPatternSplat$7,
          arrPatternBeforeDefault$7,
          x$2,
          tmpIfTest$11,
        );
        return tmpReturnArg$6;
      } else {
        const tmpReturnArg$7 = tmpBranchingB$2(
          tmpParamBare$6,
          bindingPatternArrRoot$6,
          tmpIfTest$9,
          arrPatternSplat$6,
          arrPatternBeforeDefault$6,
          arrPatternStep$4,
          tmpIfTest$10,
          arrPatternSplat$7,
          arrPatternBeforeDefault$7,
          x$2,
          tmpIfTest$11,
        );
        return tmpReturnArg$7;
      }
    };
    if (tmpIfTest$4) {
      const tmpReturnArg$8 = tmpBranchingA$1(
        tmpParamBare$3,
        bindingPatternArrRoot$3,
        tmpIfTest$3,
        arrPatternSplat$2,
        arrPatternBeforeDefault$2,
        arrPatternStep$1,
        tmpIfTest$4,
      );
      return tmpReturnArg$8;
    } else {
      const tmpReturnArg$9 = tmpBranchingB$1(
        tmpParamBare$3,
        bindingPatternArrRoot$3,
        tmpIfTest$3,
        arrPatternSplat$2,
        arrPatternBeforeDefault$2,
        arrPatternStep$1,
        tmpIfTest$4,
      );
      return tmpReturnArg$9;
    }
  };
  if (tmpIfTest) {
    const tmpReturnArg$10 = tmpBranchingA(tmpParamBare, bindingPatternArrRoot, tmpIfTest);
    return tmpReturnArg$10;
  } else {
    const tmpReturnArg$11 = tmpBranchingB(tmpParamBare, bindingPatternArrRoot, tmpIfTest);
    return tmpReturnArg$11;
  }
};
const tmpCallCallee$4 = $;
const tmpCallCallee$5 = f;
const tmpArrElement = ['abc', 201];
const tmpCalleeParam$5 = [tmpArrElement, 4, 5];
const tmpCalleeParam$6 = 200;
const tmpCalleeParam$4 = tmpCallCallee$5(tmpCalleeParam$5, tmpCalleeParam$6);
tmpCallCallee$4(tmpCalleeParam$4);
`````

## Output

`````js filename=intro
const f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  const tmpIfTest = tmpParamBare === undefined;
  const tmpBranchingC = function ($$0) {
    const bindingPatternArrRoot$3 = $$0;
    debugger;
    const arrPatternSplat$2 = [...bindingPatternArrRoot$3];
    const arrPatternBeforeDefault$2 = arrPatternSplat$2[0];
    const tmpIfTest$4 = arrPatternBeforeDefault$2 === undefined;
    const tmpBranchingC$1 = function ($$0) {
      const arrPatternStep$4 = $$0;
      debugger;
      const arrPatternSplat$7 = [...arrPatternStep$4];
      const arrPatternBeforeDefault$7 = arrPatternSplat$7[0];
      const tmpIfTest$11 = arrPatternBeforeDefault$7 === undefined;
      if (tmpIfTest$11) {
        const SSA_x$3 = $('fail');
        return SSA_x$3;
      } else {
        return arrPatternBeforeDefault$7;
      }
    };
    if (tmpIfTest$4) {
      const tmpCalleeParam$3 = ['fail2'];
      const SSA_arrPatternStep$2 = $(tmpCalleeParam$3);
      const tmpReturnArg$2 = tmpBranchingC$1(SSA_arrPatternStep$2);
      return tmpReturnArg$2;
    } else {
      const tmpReturnArg$9 = tmpBranchingC$1(arrPatternBeforeDefault$2);
      return tmpReturnArg$9;
    }
  };
  if (tmpIfTest) {
    const tmpCalleeParam$1 = ['fail3'];
    const SSA_bindingPatternArrRoot$1 = $(tmpCalleeParam$1);
    const tmpReturnArg = tmpBranchingC(SSA_bindingPatternArrRoot$1);
    return tmpReturnArg;
  } else {
    const tmpReturnArg$11 = tmpBranchingC(tmpParamBare);
    return tmpReturnArg$11;
  }
};
const tmpArrElement = ['abc', 201];
const tmpCalleeParam$5 = [tmpArrElement, 4, 5];
const tmpCalleeParam$4 = f(tmpCalleeParam$5, 200);
$(tmpCalleeParam$4);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'abc'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
