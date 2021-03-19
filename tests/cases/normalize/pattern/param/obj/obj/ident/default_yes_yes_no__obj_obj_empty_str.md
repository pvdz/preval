# Preval test case

# default_yes_yes_no__obj_obj_empty_str.md

> Normalize > Pattern > Param > Obj > Obj > Ident > Default yes yes no  obj obj empty str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x: { y = $('fail') } = $({ y: 'fail2' }) }) {
  return y;
}
$(f({ x: { x: 1, y: '', z: 3 }, b: 11, c: 12 }, 10));
`````

## Pre Normal

`````js filename=intro
let f = function (tmpParamPattern) {
  let { x: { y = $('fail') } = $({ y: 'fail2' }) } = tmpParamPattern;
  return y;
};
$(f({ x: { x: 1, y: '', z: 3 }, b: 11, c: 12 }, 10));
`````

## Normalized

`````js filename=intro
let f = function (tmpParamPattern) {
  let bindingPatternObjRoot = tmpParamPattern;
  let objPatternBeforeDefault = bindingPatternObjRoot.x;
  let objPatternAfterDefault = undefined;
  const tmpIfTest = objPatternBeforeDefault === undefined;
  const tmpBranchingA = function (
    tmpParamPattern$1,
    bindingPatternObjRoot$1,
    objPatternBeforeDefault$2,
    objPatternAfterDefault$1,
    tmpIfTest$1,
  ) {
    const tmpCallCallee$1 = $;
    const tmpCalleeParam$1 = { y: 'fail2' };
    objPatternAfterDefault$1 = tmpCallCallee$1(tmpCalleeParam$1);
    const tmpReturnArg = tmpBranchingC(
      tmpParamPattern$1,
      bindingPatternObjRoot$1,
      objPatternBeforeDefault$2,
      objPatternAfterDefault$1,
      tmpIfTest$1,
    );
    return tmpReturnArg;
  };
  const tmpBranchingB = function (
    tmpParamPattern$2,
    bindingPatternObjRoot$2,
    objPatternBeforeDefault$3,
    objPatternAfterDefault$2,
    tmpIfTest$2,
  ) {
    objPatternAfterDefault$2 = objPatternBeforeDefault$3;
    const tmpReturnArg$1 = tmpBranchingC(
      tmpParamPattern$2,
      bindingPatternObjRoot$2,
      objPatternBeforeDefault$3,
      objPatternAfterDefault$2,
      tmpIfTest$2,
    );
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function (
    tmpParamPattern$3,
    bindingPatternObjRoot$3,
    objPatternBeforeDefault$4,
    objPatternAfterDefault$3,
    tmpIfTest$3,
  ) {
    let objPatternBeforeDefault$5 = objPatternAfterDefault$3.y;
    let y$1 = undefined;
    const tmpIfTest$4 = objPatternBeforeDefault$5 === undefined;
    const tmpBranchingA$1 = function (
      tmpParamPattern$4,
      bindingPatternObjRoot$4,
      objPatternBeforeDefault$6,
      objPatternAfterDefault$4,
      tmpIfTest$5,
      objPatternBeforeDefault$7,
      y$2,
      tmpIfTest$6,
    ) {
      y$2 = $('fail');
      const tmpReturnArg$2 = tmpBranchingC$1(
        tmpParamPattern$4,
        bindingPatternObjRoot$4,
        objPatternBeforeDefault$6,
        objPatternAfterDefault$4,
        tmpIfTest$5,
        objPatternBeforeDefault$7,
        y$2,
        tmpIfTest$6,
      );
      return tmpReturnArg$2;
    };
    const tmpBranchingB$1 = function (
      tmpParamPattern$5,
      bindingPatternObjRoot$5,
      objPatternBeforeDefault$8,
      objPatternAfterDefault$5,
      tmpIfTest$7,
      objPatternBeforeDefault$9,
      y$3,
      tmpIfTest$8,
    ) {
      y$3 = objPatternBeforeDefault$9;
      const tmpReturnArg$3 = tmpBranchingC$1(
        tmpParamPattern$5,
        bindingPatternObjRoot$5,
        objPatternBeforeDefault$8,
        objPatternAfterDefault$5,
        tmpIfTest$7,
        objPatternBeforeDefault$9,
        y$3,
        tmpIfTest$8,
      );
      return tmpReturnArg$3;
    };
    const tmpBranchingC$1 = function (
      tmpParamPattern$6,
      bindingPatternObjRoot$6,
      objPatternBeforeDefault$10,
      objPatternAfterDefault$6,
      tmpIfTest$9,
      objPatternBeforeDefault$11,
      y$4,
      tmpIfTest$10,
    ) {
      return y$4;
    };
    if (tmpIfTest$4) {
      const tmpReturnArg$4 = tmpBranchingA$1(
        tmpParamPattern$3,
        bindingPatternObjRoot$3,
        objPatternBeforeDefault$4,
        objPatternAfterDefault$3,
        tmpIfTest$3,
        objPatternBeforeDefault$5,
        y$1,
        tmpIfTest$4,
      );
      return tmpReturnArg$4;
    } else {
      const tmpReturnArg$5 = tmpBranchingB$1(
        tmpParamPattern$3,
        bindingPatternObjRoot$3,
        objPatternBeforeDefault$4,
        objPatternAfterDefault$3,
        tmpIfTest$3,
        objPatternBeforeDefault$5,
        y$1,
        tmpIfTest$4,
      );
      return tmpReturnArg$5;
    }
  };
  if (tmpIfTest) {
    const tmpReturnArg$6 = tmpBranchingA(
      tmpParamPattern,
      bindingPatternObjRoot,
      objPatternBeforeDefault,
      objPatternAfterDefault,
      tmpIfTest,
    );
    return tmpReturnArg$6;
  } else {
    const tmpReturnArg$7 = tmpBranchingB(
      tmpParamPattern,
      bindingPatternObjRoot,
      objPatternBeforeDefault,
      objPatternAfterDefault,
      tmpIfTest,
    );
    return tmpReturnArg$7;
  }
};
const tmpCallCallee$2 = $;
const tmpCallCallee$3 = f;
const tmpObjLitVal = { x: 1, y: '', z: 3 };
const tmpCalleeParam$3 = { x: tmpObjLitVal, b: 11, c: 12 };
const tmpCalleeParam$4 = 10;
const tmpCalleeParam$2 = tmpCallCallee$3(tmpCalleeParam$3, tmpCalleeParam$4);
tmpCallCallee$2(tmpCalleeParam$2);
`````

## Output

`````js filename=intro
const f = function (tmpParamPattern) {
  const objPatternBeforeDefault = tmpParamPattern.x;
  const tmpIfTest = objPatternBeforeDefault === undefined;
  const tmpBranchingC = function (objPatternAfterDefault$3) {
    const objPatternBeforeDefault$5 = objPatternAfterDefault$3.y;
    const tmpIfTest$4 = objPatternBeforeDefault$5 === undefined;
    if (tmpIfTest$4) {
      const SSA_y$2 = $('fail');
      return SSA_y$2;
    } else {
      return objPatternBeforeDefault$5;
    }
  };
  if (tmpIfTest) {
    const tmpCalleeParam$1 = { y: 'fail2' };
    const SSA_objPatternAfterDefault$1 = $(tmpCalleeParam$1);
    const tmpReturnArg = tmpBranchingC(SSA_objPatternAfterDefault$1);
    return tmpReturnArg;
  } else {
    const tmpReturnArg$1 = tmpBranchingC(objPatternBeforeDefault);
    return tmpReturnArg$1;
  }
};
const tmpObjLitVal = { x: 1, y: '', z: 3 };
const tmpCalleeParam$3 = { x: tmpObjLitVal, b: 11, c: 12 };
const tmpCalleeParam$2 = f(tmpCalleeParam$3, 10);
$(tmpCalleeParam$2);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: ''
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
