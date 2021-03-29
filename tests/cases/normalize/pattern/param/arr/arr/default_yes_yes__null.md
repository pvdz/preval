# Preval test case

# default_yes_yes__null.md

> Normalize > Pattern > Param > Arr > Arr > Default yes yes  null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([[] = $(['fail2'])] = $(['fail3'])) {
  return 'bad';
}
$(f(null, 200));
`````

## Pre Normal

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let [[] = $(['fail2'])] = tmpParamBare === undefined ? $(['fail3']) : tmpParamBare;
  return 'bad';
};
$(f(null, 200));
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
    let arrPatternBeforeDefault$1 = arrPatternSplat$3[0];
    let arrPatternStep$1 = undefined;
    const tmpIfTest$7 = arrPatternBeforeDefault$1 === undefined;
    const tmpBranchingA$1 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6) {
      let tmpParamBare$7 = $$0;
      let bindingPatternArrRoot$7 = $$1;
      let tmpIfTest$9 = $$2;
      let arrPatternSplat$7 = $$3;
      let arrPatternBeforeDefault$3 = $$4;
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
      let arrPatternSplat$9 = $$3;
      let arrPatternBeforeDefault$5 = $$4;
      let arrPatternStep$5 = $$5;
      let tmpIfTest$15 = $$6;
      debugger;
      arrPatternStep$5 = arrPatternBeforeDefault$5;
      const tmpReturnArg$5 = tmpBranchingC$1(
        tmpParamBare$9,
        bindingPatternArrRoot$9,
        tmpIfTest$13,
        arrPatternSplat$9,
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
      let arrPatternSplat$11 = $$3;
      let arrPatternBeforeDefault$7 = $$4;
      let arrPatternStep$7 = $$5;
      let tmpIfTest$19 = $$6;
      debugger;
      let arrPatternSplat$13 = [...arrPatternStep$7];
      return 'bad';
    };
    if (tmpIfTest$7) {
      const tmpReturnArg$7 = tmpBranchingA$1(
        tmpParamBare$5,
        bindingPatternArrRoot$5,
        tmpIfTest$5,
        arrPatternSplat$3,
        arrPatternBeforeDefault$1,
        arrPatternStep$1,
        tmpIfTest$7,
      );
      return tmpReturnArg$7;
    } else {
      const tmpReturnArg$9 = tmpBranchingB$1(
        tmpParamBare$5,
        bindingPatternArrRoot$5,
        tmpIfTest$5,
        arrPatternSplat$3,
        arrPatternBeforeDefault$1,
        arrPatternStep$1,
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
const tmpCallCallee$7 = $;
const tmpCalleeParam$7 = f(null, 200);
tmpCallCallee$7(tmpCalleeParam$7);
`````

## Output

`````js filename=intro
const $clone$tmpBranchingC$0_Nnull = function () {
  debugger;
  const arrPatternSplat$1 = [...null];
  const arrPatternBeforeDefault$2 = arrPatternSplat$1[0];
  const tmpIfTest$1 = arrPatternBeforeDefault$2 === undefined;
  if (tmpIfTest$1) {
    const tmpCalleeParam$2 = ['fail2'];
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
  [...arrPatternStep$7];
  return 'bad';
};
const tmpCalleeParam$7 = $clone$tmpBranchingC$0_Nnull();
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
