# Preval test case

# default_yes_yes_yes__empty.md

> Normalize > Pattern > Param > Obj > Obj > Ident > Default yes yes yes  empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x: { y = $('fail') } = $({ y: 'fail2' }) } = $({ x: { y: 'pass3' } })) {
  return y;
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let { x: { y: y = $('fail') } = $({ y: 'fail2' }) } = tmpParamBare === undefined ? $({ x: { y: 'pass3' } }) : tmpParamBare;
  return y;
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let bindingPatternObjRoot = undefined;
  const tmpIfTest = tmpParamBare === undefined;
  const tmpBranchingA = function () {
    debugger;
    const tmpCallCallee$1 = $;
    const tmpObjLitVal$1 = { y: 'pass3' };
    const tmpCalleeParam$1 = { x: tmpObjLitVal$1 };
    bindingPatternObjRoot = tmpCallCallee$1(tmpCalleeParam$1);
    const tmpReturnArg = tmpBranchingC();
    return tmpReturnArg;
  };
  const tmpBranchingB = function () {
    debugger;
    bindingPatternObjRoot = tmpParamBare;
    const tmpReturnArg$1 = tmpBranchingC();
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function () {
    debugger;
    objPatternBeforeDefault = bindingPatternObjRoot.x;
    const tmpIfTest$1 = objPatternBeforeDefault === undefined;
    const tmpBranchingA$1 = function () {
      debugger;
      const tmpCallCallee$5 = $;
      const tmpCalleeParam$5 = { y: 'fail2' };
      objPatternAfterDefault = tmpCallCallee$5(tmpCalleeParam$5);
      const tmpReturnArg$3 = tmpBranchingC$1();
      return tmpReturnArg$3;
    };
    const tmpBranchingB$1 = function () {
      debugger;
      objPatternAfterDefault = objPatternBeforeDefault;
      const tmpReturnArg$5 = tmpBranchingC$1();
      return tmpReturnArg$5;
    };
    const tmpBranchingC$1 = function () {
      debugger;
      objPatternBeforeDefault$1 = objPatternAfterDefault.y;
      const tmpIfTest$3 = objPatternBeforeDefault$1 === undefined;
      const tmpBranchingA$3 = function () {
        debugger;
        y = $('fail');
        const tmpReturnArg$7 = tmpBranchingC$3();
        return tmpReturnArg$7;
      };
      const tmpBranchingB$3 = function () {
        debugger;
        y = objPatternBeforeDefault$1;
        const tmpReturnArg$9 = tmpBranchingC$3();
        return tmpReturnArg$9;
      };
      const tmpBranchingC$3 = function () {
        debugger;
        return y;
      };
      if (tmpIfTest$3) {
        const tmpReturnArg$11 = tmpBranchingA$3();
        return tmpReturnArg$11;
      } else {
        const tmpReturnArg$13 = tmpBranchingB$3();
        return tmpReturnArg$13;
      }
    };
    if (tmpIfTest$1) {
      const tmpReturnArg$15 = tmpBranchingA$1();
      return tmpReturnArg$15;
    } else {
      const tmpReturnArg$17 = tmpBranchingB$1();
      return tmpReturnArg$17;
    }
  };
  let objPatternBeforeDefault = undefined;
  let objPatternAfterDefault = undefined;
  let objPatternBeforeDefault$1 = undefined;
  let y = undefined;
  if (tmpIfTest) {
    const tmpReturnArg$19 = tmpBranchingA();
    return tmpReturnArg$19;
  } else {
    const tmpReturnArg$21 = tmpBranchingB();
    return tmpReturnArg$21;
  }
};
const tmpCallCallee$7 = $;
const tmpCalleeParam$7 = f();
tmpCallCallee$7(tmpCalleeParam$7);
`````

## Output

`````js filename=intro
const f = function () {
  debugger;
  const tmpBranchingC$1 = function () {
    debugger;
    objPatternBeforeDefault$1 = objPatternAfterDefault.y;
    const tmpIfTest$3 = objPatternBeforeDefault$1 === undefined;
    if (tmpIfTest$3) {
      y = $('fail');
      const tmpReturnArg$7 = y;
      return tmpReturnArg$7;
    } else {
      y = objPatternBeforeDefault$1;
      const tmpReturnArg$9 = y;
      return tmpReturnArg$9;
    }
  };
  let objPatternAfterDefault = undefined;
  let objPatternBeforeDefault$1 = undefined;
  let y = undefined;
  const tmpObjLitVal$1 = { y: 'pass3' };
  const tmpCalleeParam$1 = { x: tmpObjLitVal$1 };
  const tmpSSA_bindingPatternObjRoot = $(tmpCalleeParam$1);
  const tmpSSA_objPatternBeforeDefault = tmpSSA_bindingPatternObjRoot.x;
  const tmpIfTest$1 = tmpSSA_objPatternBeforeDefault === undefined;
  if (tmpIfTest$1) {
    const tmpCalleeParam$2 = { y: 'fail2' };
    objPatternAfterDefault = $(tmpCalleeParam$2);
    const tmpReturnArg$1 = tmpBranchingC$1();
    return tmpReturnArg$1;
  } else {
    objPatternAfterDefault = tmpSSA_objPatternBeforeDefault;
    const tmpReturnArg$4 = tmpBranchingC$1();
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
 - 1: { x: '{"y":"\\"pass3\\""}' }
 - 2: 'pass3'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
