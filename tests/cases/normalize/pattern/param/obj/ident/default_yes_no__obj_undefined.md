# Preval test case

# default_yes_no__obj_undefined.md

> Normalize > Pattern > Param > Obj > Ident > Default yes no  obj undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x = $('pass') }) {
  return x;
}
$(f({ x: undefined }, 10));
`````

## Pre Normal

`````js filename=intro
let f = function (tmpParamPattern) {
  let { x = $('pass') } = tmpParamPattern;
  return x;
};
$(f({ x: undefined }, 10));
`````

## Normalized

`````js filename=intro
let f = function (tmpParamPattern) {
  let bindingPatternObjRoot = tmpParamPattern;
  let objPatternBeforeDefault = bindingPatternObjRoot.x;
  let x = undefined;
  const tmpIfTest = objPatternBeforeDefault === undefined;
  const tmpBranchingA = function (tmpParamPattern$1, bindingPatternObjRoot$1, objPatternBeforeDefault$1, x$1, tmpIfTest$1) {
    x$1 = $('pass');
    const tmpReturnArg = tmpBranchingC(tmpParamPattern$1, bindingPatternObjRoot$1, objPatternBeforeDefault$1, x$1, tmpIfTest$1);
    return tmpReturnArg;
  };
  const tmpBranchingB = function (tmpParamPattern$2, bindingPatternObjRoot$2, objPatternBeforeDefault$2, x$2, tmpIfTest$2) {
    x$2 = objPatternBeforeDefault$2;
    const tmpReturnArg$1 = tmpBranchingC(tmpParamPattern$2, bindingPatternObjRoot$2, objPatternBeforeDefault$2, x$2, tmpIfTest$2);
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function (tmpParamPattern$3, bindingPatternObjRoot$3, objPatternBeforeDefault$3, x$3, tmpIfTest$3) {
    return x$3;
  };
  if (tmpIfTest) {
    const tmpReturnArg$2 = tmpBranchingA(tmpParamPattern, bindingPatternObjRoot, objPatternBeforeDefault, x, tmpIfTest);
    return tmpReturnArg$2;
  } else {
    const tmpReturnArg$3 = tmpBranchingB(tmpParamPattern, bindingPatternObjRoot, objPatternBeforeDefault, x, tmpIfTest);
    return tmpReturnArg$3;
  }
};
const tmpCallCallee = $;
const tmpCallCallee$1 = f;
const tmpCalleeParam$1 = { x: undefined };
const tmpCalleeParam$2 = 10;
const tmpCalleeParam = tmpCallCallee$1(tmpCalleeParam$1, tmpCalleeParam$2);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function (tmpParamPattern) {
  const objPatternBeforeDefault = tmpParamPattern.x;
  const tmpIfTest = objPatternBeforeDefault === undefined;
  if (tmpIfTest) {
    const SSA_x$1 = $('pass');
    return SSA_x$1;
  } else {
    return objPatternBeforeDefault;
  }
};
const tmpCalleeParam$1 = { x: undefined };
const tmpCalleeParam = f(tmpCalleeParam$1, 10);
$(tmpCalleeParam);
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
