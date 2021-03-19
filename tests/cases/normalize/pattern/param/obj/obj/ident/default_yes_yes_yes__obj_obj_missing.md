# Preval test case

# default_yes_yes_yes__obj_obj_missing.md

> Normalize > Pattern > Param > Obj > Obj > Ident > Default yes yes yes  obj obj missing
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x: { y = $('pass') } = $({ y: 'fail2' }) } = $({ x: { y: 'fail3' } })) {
  return y;
}
$(f({ x: { x: 1, z: 3 }, b: 11, c: 12 }, 10));
`````

## Pre Normal

`````js filename=intro
let f = function (tmpParamDefault) {
  let { x: { y = $('pass') } = $({ y: 'fail2' }) } = tmpParamDefault === undefined ? $({ x: { y: 'fail3' } }) : tmpParamDefault;
  return y;
};
$(f({ x: { x: 1, z: 3 }, b: 11, c: 12 }, 10));
`````

## Normalized

`````js filename=intro
let f = function (tmpParamDefault) {
  let bindingPatternObjRoot = undefined;
  const tmpIfTest = tmpParamDefault === undefined;
  const tmpBranchingA = function (tmpParamDefault$1, bindingPatternObjRoot$1, tmpIfTest$1) {
    const tmpCallCallee$1 = $;
    const tmpObjLitVal$1 = { y: 'fail3' };
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
    let objPatternBeforeDefault$2 = bindingPatternObjRoot$3.x;
    let objPatternAfterDefault$1 = undefined;
    const tmpIfTest$4 = objPatternBeforeDefault$2 === undefined;
    const tmpBranchingA$1 = function (
      tmpParamDefault$4,
      bindingPatternObjRoot$4,
      tmpIfTest$5,
      objPatternBeforeDefault$4,
      objPatternAfterDefault$2,
      tmpIfTest$6,
    ) {
      const tmpCallCallee$3 = $;
      const tmpCalleeParam$3 = { y: 'fail2' };
      objPatternAfterDefault$2 = tmpCallCallee$3(tmpCalleeParam$3);
      const tmpReturnArg$2 = tmpBranchingC$1(
        tmpParamDefault$4,
        bindingPatternObjRoot$4,
        tmpIfTest$5,
        objPatternBeforeDefault$4,
        objPatternAfterDefault$2,
        tmpIfTest$6,
      );
      return tmpReturnArg$2;
    };
    const tmpBranchingB$1 = function (
      tmpParamDefault$5,
      bindingPatternObjRoot$5,
      tmpIfTest$7,
      objPatternBeforeDefault$5,
      objPatternAfterDefault$3,
      tmpIfTest$8,
    ) {
      objPatternAfterDefault$3 = objPatternBeforeDefault$5;
      const tmpReturnArg$3 = tmpBranchingC$1(
        tmpParamDefault$5,
        bindingPatternObjRoot$5,
        tmpIfTest$7,
        objPatternBeforeDefault$5,
        objPatternAfterDefault$3,
        tmpIfTest$8,
      );
      return tmpReturnArg$3;
    };
    const tmpBranchingC$1 = function (
      tmpParamDefault$6,
      bindingPatternObjRoot$6,
      tmpIfTest$9,
      objPatternBeforeDefault$6,
      objPatternAfterDefault$4,
      tmpIfTest$10,
    ) {
      let objPatternBeforeDefault$7 = objPatternAfterDefault$4.y;
      let y$2 = undefined;
      const tmpIfTest$11 = objPatternBeforeDefault$7 === undefined;
      const tmpBranchingA$2 = function (
        tmpParamDefault$7,
        bindingPatternObjRoot$7,
        tmpIfTest$12,
        objPatternBeforeDefault$8,
        objPatternAfterDefault$5,
        tmpIfTest$13,
        objPatternBeforeDefault$9,
        y$3,
        tmpIfTest$14,
      ) {
        y$3 = $('pass');
        const tmpReturnArg$4 = tmpBranchingC$2(
          tmpParamDefault$7,
          bindingPatternObjRoot$7,
          tmpIfTest$12,
          objPatternBeforeDefault$8,
          objPatternAfterDefault$5,
          tmpIfTest$13,
          objPatternBeforeDefault$9,
          y$3,
          tmpIfTest$14,
        );
        return tmpReturnArg$4;
      };
      const tmpBranchingB$2 = function (
        tmpParamDefault$8,
        bindingPatternObjRoot$8,
        tmpIfTest$15,
        objPatternBeforeDefault$10,
        objPatternAfterDefault$6,
        tmpIfTest$16,
        objPatternBeforeDefault$11,
        y$4,
        tmpIfTest$17,
      ) {
        y$4 = objPatternBeforeDefault$11;
        const tmpReturnArg$5 = tmpBranchingC$2(
          tmpParamDefault$8,
          bindingPatternObjRoot$8,
          tmpIfTest$15,
          objPatternBeforeDefault$10,
          objPatternAfterDefault$6,
          tmpIfTest$16,
          objPatternBeforeDefault$11,
          y$4,
          tmpIfTest$17,
        );
        return tmpReturnArg$5;
      };
      const tmpBranchingC$2 = function (
        tmpParamDefault$9,
        bindingPatternObjRoot$9,
        tmpIfTest$18,
        objPatternBeforeDefault$12,
        objPatternAfterDefault$7,
        tmpIfTest$19,
        objPatternBeforeDefault$13,
        y$5,
        tmpIfTest$20,
      ) {
        return y$5;
      };
      if (tmpIfTest$11) {
        const tmpReturnArg$6 = tmpBranchingA$2(
          tmpParamDefault$6,
          bindingPatternObjRoot$6,
          tmpIfTest$9,
          objPatternBeforeDefault$6,
          objPatternAfterDefault$4,
          tmpIfTest$10,
          objPatternBeforeDefault$7,
          y$2,
          tmpIfTest$11,
        );
        return tmpReturnArg$6;
      } else {
        const tmpReturnArg$7 = tmpBranchingB$2(
          tmpParamDefault$6,
          bindingPatternObjRoot$6,
          tmpIfTest$9,
          objPatternBeforeDefault$6,
          objPatternAfterDefault$4,
          tmpIfTest$10,
          objPatternBeforeDefault$7,
          y$2,
          tmpIfTest$11,
        );
        return tmpReturnArg$7;
      }
    };
    if (tmpIfTest$4) {
      const tmpReturnArg$8 = tmpBranchingA$1(
        tmpParamDefault$3,
        bindingPatternObjRoot$3,
        tmpIfTest$3,
        objPatternBeforeDefault$2,
        objPatternAfterDefault$1,
        tmpIfTest$4,
      );
      return tmpReturnArg$8;
    } else {
      const tmpReturnArg$9 = tmpBranchingB$1(
        tmpParamDefault$3,
        bindingPatternObjRoot$3,
        tmpIfTest$3,
        objPatternBeforeDefault$2,
        objPatternAfterDefault$1,
        tmpIfTest$4,
      );
      return tmpReturnArg$9;
    }
  };
  if (tmpIfTest) {
    const tmpReturnArg$10 = tmpBranchingA(tmpParamDefault, bindingPatternObjRoot, tmpIfTest);
    return tmpReturnArg$10;
  } else {
    const tmpReturnArg$11 = tmpBranchingB(tmpParamDefault, bindingPatternObjRoot, tmpIfTest);
    return tmpReturnArg$11;
  }
};
const tmpCallCallee$4 = $;
const tmpCallCallee$5 = f;
const tmpObjLitVal$2 = { x: 1, z: 3 };
const tmpCalleeParam$5 = { x: tmpObjLitVal$2, b: 11, c: 12 };
const tmpCalleeParam$6 = 10;
const tmpCalleeParam$4 = tmpCallCallee$5(tmpCalleeParam$5, tmpCalleeParam$6);
tmpCallCallee$4(tmpCalleeParam$4);
`````

## Output

`````js filename=intro
const f = function (tmpParamDefault) {
  const tmpIfTest = tmpParamDefault === undefined;
  const tmpBranchingC = function (bindingPatternObjRoot$3) {
    const objPatternBeforeDefault$2 = bindingPatternObjRoot$3.x;
    const tmpIfTest$4 = objPatternBeforeDefault$2 === undefined;
    const tmpBranchingC$1 = function (objPatternAfterDefault$4) {
      const objPatternBeforeDefault$7 = objPatternAfterDefault$4.y;
      const tmpIfTest$11 = objPatternBeforeDefault$7 === undefined;
      if (tmpIfTest$11) {
        const SSA_y$3 = $('pass');
        return SSA_y$3;
      } else {
        return objPatternBeforeDefault$7;
      }
    };
    if (tmpIfTest$4) {
      const tmpCalleeParam$3 = { y: 'fail2' };
      const SSA_objPatternAfterDefault$2 = $(tmpCalleeParam$3);
      const tmpReturnArg$2 = tmpBranchingC$1(SSA_objPatternAfterDefault$2);
      return tmpReturnArg$2;
    } else {
      const tmpReturnArg$3 = tmpBranchingC$1(objPatternBeforeDefault$2);
      return tmpReturnArg$3;
    }
  };
  if (tmpIfTest) {
    const tmpObjLitVal$1 = { y: 'fail3' };
    const tmpCalleeParam$1 = { x: tmpObjLitVal$1 };
    const SSA_bindingPatternObjRoot$1 = $(tmpCalleeParam$1);
    const tmpReturnArg = tmpBranchingC(SSA_bindingPatternObjRoot$1);
    return tmpReturnArg;
  } else {
    const tmpReturnArg$1 = tmpBranchingC(tmpParamDefault);
    return tmpReturnArg$1;
  }
};
const tmpObjLitVal$2 = { x: 1, z: 3 };
const tmpCalleeParam$5 = { x: tmpObjLitVal$2, b: 11, c: 12 };
const tmpCalleeParam$4 = f(tmpCalleeParam$5, 10);
$(tmpCalleeParam$4);
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
