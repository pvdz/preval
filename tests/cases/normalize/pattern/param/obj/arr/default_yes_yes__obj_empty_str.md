# Preval test case

# default_yes_yes__obj_empty_str.md

> Normalize > Pattern > Param > Obj > Arr > Default yes yes  obj empty str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x: [] = $(['fail']) } = $({ x: ['fail2'] })) {
  return 'ok';
}
$(f({ x: '', a: 11, b: 12 }, 10));
`````

## Pre Normal

`````js filename=intro
let f = function (tmpParamDefault) {
  let { x: [] = $(['fail']) } = tmpParamDefault === undefined ? $({ x: ['fail2'] }) : tmpParamDefault;
  return 'ok';
};
$(f({ x: '', a: 11, b: 12 }, 10));
`````

## Normalized

`````js filename=intro
let f = function (tmpParamDefault) {
  let bindingPatternObjRoot = undefined;
  const tmpIfTest = tmpParamDefault === undefined;
  const tmpBranchingA = function (tmpParamDefault$1, bindingPatternObjRoot$1, tmpIfTest$1) {
    const tmpCallCallee$1 = $;
    const tmpObjLitVal$1 = ['fail2'];
    const tmpCalleeParam$1 = { x: tmpObjLitVal$1 };
    bindingPatternObjRoot$1 = tmpCallCallee$1(tmpCalleeParam$1);
    const tmpReturnArg = tmpBranchingC(tmpParamDefault$1, bindingPatternObjRoot$1, tmpIfTest$1);
    return tmpReturnArg;
  };
  const tmpBranchingB = function (tmpParamDefault$2, bindingPatternObjRoot$2, tmpIfTest$2) {
    bindingPatternObjRoot$2 = tmpParamDefault$2;
    const tmpReturnArg$1 = tmpBranchingC(tmpParamDefault$2, bindingPatternObjRoot$2, tmpIfTest$2);
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function (tmpParamDefault$3, bindingPatternObjRoot$3, tmpIfTest$3) {
    let objPatternBeforeDefault$1 = bindingPatternObjRoot$3.x;
    let objPatternAfterDefault$1 = undefined;
    const tmpIfTest$4 = objPatternBeforeDefault$1 === undefined;
    const tmpBranchingA$1 = function (
      tmpParamDefault$4,
      bindingPatternObjRoot$4,
      tmpIfTest$5,
      objPatternBeforeDefault$2,
      objPatternAfterDefault$2,
      tmpIfTest$6,
    ) {
      const tmpCallCallee$3 = $;
      const tmpCalleeParam$3 = ['fail'];
      objPatternAfterDefault$2 = tmpCallCallee$3(tmpCalleeParam$3);
      const tmpReturnArg$2 = tmpBranchingC$1(
        tmpParamDefault$4,
        bindingPatternObjRoot$4,
        tmpIfTest$5,
        objPatternBeforeDefault$2,
        objPatternAfterDefault$2,
        tmpIfTest$6,
      );
      return tmpReturnArg$2;
    };
    const tmpBranchingB$1 = function (
      tmpParamDefault$5,
      bindingPatternObjRoot$5,
      tmpIfTest$7,
      objPatternBeforeDefault$3,
      objPatternAfterDefault$3,
      tmpIfTest$8,
    ) {
      objPatternAfterDefault$3 = objPatternBeforeDefault$3;
      const tmpReturnArg$3 = tmpBranchingC$1(
        tmpParamDefault$5,
        bindingPatternObjRoot$5,
        tmpIfTest$7,
        objPatternBeforeDefault$3,
        objPatternAfterDefault$3,
        tmpIfTest$8,
      );
      return tmpReturnArg$3;
    };
    const tmpBranchingC$1 = function (
      tmpParamDefault$6,
      bindingPatternObjRoot$6,
      tmpIfTest$9,
      objPatternBeforeDefault$4,
      objPatternAfterDefault$4,
      tmpIfTest$10,
    ) {
      let arrPatternSplat$2 = [...objPatternAfterDefault$4];
      return 'ok';
    };
    if (tmpIfTest$4) {
      const tmpReturnArg$4 = tmpBranchingA$1(
        tmpParamDefault$3,
        bindingPatternObjRoot$3,
        tmpIfTest$3,
        objPatternBeforeDefault$1,
        objPatternAfterDefault$1,
        tmpIfTest$4,
      );
      return tmpReturnArg$4;
    } else {
      const tmpReturnArg$5 = tmpBranchingB$1(
        tmpParamDefault$3,
        bindingPatternObjRoot$3,
        tmpIfTest$3,
        objPatternBeforeDefault$1,
        objPatternAfterDefault$1,
        tmpIfTest$4,
      );
      return tmpReturnArg$5;
    }
  };
  if (tmpIfTest) {
    const tmpReturnArg$6 = tmpBranchingA(tmpParamDefault, bindingPatternObjRoot, tmpIfTest);
    return tmpReturnArg$6;
  } else {
    const tmpReturnArg$7 = tmpBranchingB(tmpParamDefault, bindingPatternObjRoot, tmpIfTest);
    return tmpReturnArg$7;
  }
};
const tmpCallCallee$4 = $;
const tmpCallCallee$5 = f;
const tmpCalleeParam$5 = { x: '', a: 11, b: 12 };
const tmpCalleeParam$6 = 10;
const tmpCalleeParam$4 = tmpCallCallee$5(tmpCalleeParam$5, tmpCalleeParam$6);
tmpCallCallee$4(tmpCalleeParam$4);
`````

## Output

`````js filename=intro
const f = function (tmpParamDefault) {
  const tmpIfTest = tmpParamDefault === undefined;
  const tmpBranchingC = function (bindingPatternObjRoot$3) {
    const objPatternBeforeDefault$1 = bindingPatternObjRoot$3.x;
    const tmpIfTest$4 = objPatternBeforeDefault$1 === undefined;
    const tmpBranchingC$1 = function (objPatternAfterDefault$4) {
      [...objPatternAfterDefault$4];
      return 'ok';
    };
    if (tmpIfTest$4) {
      const tmpCalleeParam$3 = ['fail'];
      const SSA_objPatternAfterDefault$2 = $(tmpCalleeParam$3);
      const tmpReturnArg$2 = tmpBranchingC$1(SSA_objPatternAfterDefault$2);
      return tmpReturnArg$2;
    } else {
      const tmpReturnArg$3 = tmpBranchingC$1(objPatternBeforeDefault$1);
      return tmpReturnArg$3;
    }
  };
  if (tmpIfTest) {
    const tmpObjLitVal$1 = ['fail2'];
    const tmpCalleeParam$1 = { x: tmpObjLitVal$1 };
    const SSA_bindingPatternObjRoot$1 = $(tmpCalleeParam$1);
    const tmpReturnArg = tmpBranchingC(SSA_bindingPatternObjRoot$1);
    return tmpReturnArg;
  } else {
    const tmpReturnArg$1 = tmpBranchingC(tmpParamDefault);
    return tmpReturnArg$1;
  }
};
const tmpCalleeParam$5 = { x: '', a: 11, b: 12 };
const tmpCalleeParam$4 = f(tmpCalleeParam$5, 10);
$(tmpCalleeParam$4);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'ok'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
