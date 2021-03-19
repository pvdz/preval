# Preval test case

# default_yes_yes__null.md

> Normalize > Pattern > Param > Obj > Ident > Default yes yes  null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x = $('fail') } = $({ x: 'fail2' })) {
  return 'bad';
}
$(f(null, 10));
`````

## Pre Normal

`````js filename=intro
let f = function (tmpParamDefault) {
  let { x = $('fail') } = tmpParamDefault === undefined ? $({ x: 'fail2' }) : tmpParamDefault;
  return 'bad';
};
$(f(null, 10));
`````

## Normalized

`````js filename=intro
let f = function (tmpParamDefault) {
  let bindingPatternObjRoot = undefined;
  const tmpIfTest = tmpParamDefault === undefined;
  const tmpBranchingA = function (tmpParamDefault$1, bindingPatternObjRoot$1, tmpIfTest$1) {
    const tmpCallCallee$1 = $;
    const tmpCalleeParam$1 = { x: 'fail2' };
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
    let x$1 = undefined;
    const tmpIfTest$4 = objPatternBeforeDefault$1 === undefined;
    const tmpBranchingA$1 = function (
      tmpParamDefault$4,
      bindingPatternObjRoot$4,
      tmpIfTest$5,
      objPatternBeforeDefault$2,
      x$2,
      tmpIfTest$6,
    ) {
      x$2 = $('fail');
      const tmpReturnArg$2 = tmpBranchingC$1(
        tmpParamDefault$4,
        bindingPatternObjRoot$4,
        tmpIfTest$5,
        objPatternBeforeDefault$2,
        x$2,
        tmpIfTest$6,
      );
      return tmpReturnArg$2;
    };
    const tmpBranchingB$1 = function (
      tmpParamDefault$5,
      bindingPatternObjRoot$5,
      tmpIfTest$7,
      objPatternBeforeDefault$3,
      x$3,
      tmpIfTest$8,
    ) {
      x$3 = objPatternBeforeDefault$3;
      const tmpReturnArg$3 = tmpBranchingC$1(
        tmpParamDefault$5,
        bindingPatternObjRoot$5,
        tmpIfTest$7,
        objPatternBeforeDefault$3,
        x$3,
        tmpIfTest$8,
      );
      return tmpReturnArg$3;
    };
    const tmpBranchingC$1 = function (
      tmpParamDefault$6,
      bindingPatternObjRoot$6,
      tmpIfTest$9,
      objPatternBeforeDefault$4,
      x$4,
      tmpIfTest$10,
    ) {
      return 'bad';
    };
    if (tmpIfTest$4) {
      const tmpReturnArg$4 = tmpBranchingA$1(
        tmpParamDefault$3,
        bindingPatternObjRoot$3,
        tmpIfTest$3,
        objPatternBeforeDefault$1,
        x$1,
        tmpIfTest$4,
      );
      return tmpReturnArg$4;
    } else {
      const tmpReturnArg$5 = tmpBranchingB$1(
        tmpParamDefault$3,
        bindingPatternObjRoot$3,
        tmpIfTest$3,
        objPatternBeforeDefault$1,
        x$1,
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
const tmpCallCallee$2 = $;
const tmpCalleeParam$2 = f(null, 10);
tmpCallCallee$2(tmpCalleeParam$2);
`````

## Output

`````js filename=intro
const f = function (tmpParamDefault) {
  const tmpIfTest = tmpParamDefault === undefined;
  const tmpBranchingC = function (bindingPatternObjRoot$3) {
    const objPatternBeforeDefault$1 = bindingPatternObjRoot$3.x;
    const tmpIfTest$4 = objPatternBeforeDefault$1 === undefined;
    if (tmpIfTest$4) {
      $('fail');
      return 'bad';
    } else {
      return 'bad';
    }
  };
  if (tmpIfTest) {
    const tmpCalleeParam$1 = { x: 'fail2' };
    const SSA_bindingPatternObjRoot$1 = $(tmpCalleeParam$1);
    const tmpReturnArg = tmpBranchingC(SSA_bindingPatternObjRoot$1);
    return tmpReturnArg;
  } else {
    const tmpReturnArg$1 = tmpBranchingC(tmpParamDefault);
    return tmpReturnArg$1;
  }
};
const tmpCalleeParam$2 = f(null, 10);
$(tmpCalleeParam$2);
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ Cannot read property <ref> of <ref2> ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
