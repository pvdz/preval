# Preval test case

# default_yes_no_no__obj_obj_str.md

> Normalize > Pattern > Param > Obj > Obj > Ident > Default yes no no  obj obj str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x: { y = $('fail') } }) {
  return y;
}
$(f({ x: { x: 1, y: 'abc', z: 3 }, b: 11, c: 12 }, 10));
`````

## Pre Normal

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let {
    x: { y = $('fail') },
  } = tmpParamBare;
  return y;
};
$(f({ x: { x: 1, y: 'abc', z: 3 }, b: 11, c: 12 }, 10));
`````

## Normalized

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let bindingPatternObjRoot = tmpParamBare;
  let objPatternNoDefault = bindingPatternObjRoot.x;
  let objPatternBeforeDefault = objPatternNoDefault.y;
  let y = undefined;
  const tmpIfTest = objPatternBeforeDefault === undefined;
  const tmpBranchingA = function ($$0, $$1, $$2, $$3, $$4, $$5) {
    let tmpParamBare$1 = $$0;
    let bindingPatternObjRoot$1 = $$1;
    let objPatternNoDefault$1 = $$2;
    let objPatternBeforeDefault$1 = $$3;
    let y$1 = $$4;
    let tmpIfTest$1 = $$5;
    debugger;
    y$1 = $('fail');
    const tmpReturnArg = tmpBranchingC(
      tmpParamBare$1,
      bindingPatternObjRoot$1,
      objPatternNoDefault$1,
      objPatternBeforeDefault$1,
      y$1,
      tmpIfTest$1,
    );
    return tmpReturnArg;
  };
  const tmpBranchingB = function ($$0, $$1, $$2, $$3, $$4, $$5) {
    let tmpParamBare$3 = $$0;
    let bindingPatternObjRoot$3 = $$1;
    let objPatternNoDefault$3 = $$2;
    let objPatternBeforeDefault$3 = $$3;
    let y$3 = $$4;
    let tmpIfTest$3 = $$5;
    debugger;
    y$3 = objPatternBeforeDefault$3;
    const tmpReturnArg$1 = tmpBranchingC(
      tmpParamBare$3,
      bindingPatternObjRoot$3,
      objPatternNoDefault$3,
      objPatternBeforeDefault$3,
      y$3,
      tmpIfTest$3,
    );
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function ($$0, $$1, $$2, $$3, $$4, $$5) {
    let tmpParamBare$5 = $$0;
    let bindingPatternObjRoot$5 = $$1;
    let objPatternNoDefault$5 = $$2;
    let objPatternBeforeDefault$5 = $$3;
    let y$5 = $$4;
    let tmpIfTest$5 = $$5;
    debugger;
    return y$5;
  };
  if (tmpIfTest) {
    const tmpReturnArg$3 = tmpBranchingA(tmpParamBare, bindingPatternObjRoot, objPatternNoDefault, objPatternBeforeDefault, y, tmpIfTest);
    return tmpReturnArg$3;
  } else {
    const tmpReturnArg$5 = tmpBranchingB(tmpParamBare, bindingPatternObjRoot, objPatternNoDefault, objPatternBeforeDefault, y, tmpIfTest);
    return tmpReturnArg$5;
  }
};
const tmpCallCallee = $;
const tmpCallCallee$1 = f;
const tmpObjLitVal = { x: 1, y: 'abc', z: 3 };
const tmpCalleeParam$1 = { x: tmpObjLitVal, b: 11, c: 12 };
const tmpCalleeParam$3 = 10;
const tmpCalleeParam = tmpCallCallee$1(tmpCalleeParam$1, tmpCalleeParam$3);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  const objPatternNoDefault = tmpParamBare.x;
  const objPatternBeforeDefault = objPatternNoDefault.y;
  const tmpIfTest = objPatternBeforeDefault === undefined;
  if (tmpIfTest) {
    const tmpReturnArg$3 = $('fail');
    return tmpReturnArg$3;
  } else {
    return objPatternBeforeDefault;
  }
};
const tmpObjLitVal = { x: 1, y: 'abc', z: 3 };
const tmpCalleeParam$1 = { x: tmpObjLitVal, b: 11, c: 12 };
const tmpCalleeParam = f(tmpCalleeParam$1);
$(tmpCalleeParam);
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
