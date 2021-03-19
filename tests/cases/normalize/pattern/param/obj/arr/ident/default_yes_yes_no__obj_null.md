# Preval test case

# default_yes_yes_no__obj_null.md

> Normalize > Pattern > Param > Obj > Arr > Ident > Default yes yes no  obj null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x: [y = 'fail'] = $(['fail2']) }) {
  return 'bad';
}
$(f({ x: null, a: 11, b: 12 }, 10));
`````

## Pre Normal

`````js filename=intro
let f = function (tmpParamPattern) {
  let { x: [y = 'fail'] = $(['fail2']) } = tmpParamPattern;
  return 'bad';
};
$(f({ x: null, a: 11, b: 12 }, 10));
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
    objPatternBeforeDefault$1,
    objPatternAfterDefault$1,
    tmpIfTest$1,
  ) {
    const tmpCallCallee$1 = $;
    const tmpCalleeParam$1 = ['fail2'];
    objPatternAfterDefault$1 = tmpCallCallee$1(tmpCalleeParam$1);
    const tmpReturnArg = tmpBranchingC(
      tmpParamPattern$1,
      bindingPatternObjRoot$1,
      objPatternBeforeDefault$1,
      objPatternAfterDefault$1,
      tmpIfTest$1,
    );
    return tmpReturnArg;
  };
  const tmpBranchingB = function (
    tmpParamPattern$2,
    bindingPatternObjRoot$2,
    objPatternBeforeDefault$2,
    objPatternAfterDefault$2,
    tmpIfTest$2,
  ) {
    objPatternAfterDefault$2 = objPatternBeforeDefault$2;
    const tmpReturnArg$1 = tmpBranchingC(
      tmpParamPattern$2,
      bindingPatternObjRoot$2,
      objPatternBeforeDefault$2,
      objPatternAfterDefault$2,
      tmpIfTest$2,
    );
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function (
    tmpParamPattern$3,
    bindingPatternObjRoot$3,
    objPatternBeforeDefault$3,
    objPatternAfterDefault$3,
    tmpIfTest$3,
  ) {
    let arrPatternSplat$1 = [...objPatternAfterDefault$3];
    let arrPatternBeforeDefault$1 = arrPatternSplat$1[0];
    let y$1 = undefined;
    const tmpIfTest$4 = arrPatternBeforeDefault$1 === undefined;
    const tmpBranchingA$1 = function (
      tmpParamPattern$4,
      bindingPatternObjRoot$4,
      objPatternBeforeDefault$4,
      objPatternAfterDefault$4,
      tmpIfTest$5,
      arrPatternSplat$2,
      arrPatternBeforeDefault$2,
      y$2,
      tmpIfTest$6,
    ) {
      y$2 = 'fail';
      const tmpReturnArg$2 = tmpBranchingC$1(
        tmpParamPattern$4,
        bindingPatternObjRoot$4,
        objPatternBeforeDefault$4,
        objPatternAfterDefault$4,
        tmpIfTest$5,
        arrPatternSplat$2,
        arrPatternBeforeDefault$2,
        y$2,
        tmpIfTest$6,
      );
      return tmpReturnArg$2;
    };
    const tmpBranchingB$1 = function (
      tmpParamPattern$5,
      bindingPatternObjRoot$5,
      objPatternBeforeDefault$5,
      objPatternAfterDefault$5,
      tmpIfTest$7,
      arrPatternSplat$3,
      arrPatternBeforeDefault$3,
      y$3,
      tmpIfTest$8,
    ) {
      y$3 = arrPatternBeforeDefault$3;
      const tmpReturnArg$3 = tmpBranchingC$1(
        tmpParamPattern$5,
        bindingPatternObjRoot$5,
        objPatternBeforeDefault$5,
        objPatternAfterDefault$5,
        tmpIfTest$7,
        arrPatternSplat$3,
        arrPatternBeforeDefault$3,
        y$3,
        tmpIfTest$8,
      );
      return tmpReturnArg$3;
    };
    const tmpBranchingC$1 = function (
      tmpParamPattern$6,
      bindingPatternObjRoot$6,
      objPatternBeforeDefault$6,
      objPatternAfterDefault$6,
      tmpIfTest$9,
      arrPatternSplat$4,
      arrPatternBeforeDefault$4,
      y$4,
      tmpIfTest$10,
    ) {
      return 'bad';
    };
    if (tmpIfTest$4) {
      const tmpReturnArg$4 = tmpBranchingA$1(
        tmpParamPattern$3,
        bindingPatternObjRoot$3,
        objPatternBeforeDefault$3,
        objPatternAfterDefault$3,
        tmpIfTest$3,
        arrPatternSplat$1,
        arrPatternBeforeDefault$1,
        y$1,
        tmpIfTest$4,
      );
      return tmpReturnArg$4;
    } else {
      const tmpReturnArg$5 = tmpBranchingB$1(
        tmpParamPattern$3,
        bindingPatternObjRoot$3,
        objPatternBeforeDefault$3,
        objPatternAfterDefault$3,
        tmpIfTest$3,
        arrPatternSplat$1,
        arrPatternBeforeDefault$1,
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
const tmpCalleeParam$3 = { x: null, a: 11, b: 12 };
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
    const arrPatternSplat$1 = [...objPatternAfterDefault$3];
    const arrPatternBeforeDefault$1 = arrPatternSplat$1[0];
    const tmpIfTest$4 = arrPatternBeforeDefault$1 === undefined;
    if (tmpIfTest$4) {
      return 'bad';
    } else {
      return 'bad';
    }
  };
  if (tmpIfTest) {
    const tmpCalleeParam$1 = ['fail2'];
    const SSA_objPatternAfterDefault$1 = $(tmpCalleeParam$1);
    const tmpReturnArg = tmpBranchingC(SSA_objPatternAfterDefault$1);
    return tmpReturnArg;
  } else {
    const tmpReturnArg$1 = tmpBranchingC(objPatternBeforeDefault);
    return tmpReturnArg$1;
  }
};
const tmpCalleeParam$3 = { x: null, a: 11, b: 12 };
const tmpCalleeParam$2 = f(tmpCalleeParam$3, 10);
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
