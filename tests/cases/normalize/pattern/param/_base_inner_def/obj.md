# Preval test case

# obj.md

> Normalize > Pattern > Param > Base inner def > Obj
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
function g({ x = b } ) { return x }
`````

## Pre Normal

`````js filename=intro
let g = function (tmpParamPattern) {
  let { x = b } = tmpParamPattern;
  return x;
};
`````

## Normalized

`````js filename=intro
let g = function (tmpParamPattern) {
  let bindingPatternObjRoot = tmpParamPattern;
  let objPatternBeforeDefault = bindingPatternObjRoot.x;
  let x = undefined;
  const tmpIfTest = objPatternBeforeDefault === undefined;
  const tmpBranchingA = function (tmpParamPattern$1, bindingPatternObjRoot$1, objPatternBeforeDefault$1, x$1, tmpIfTest$1) {
    x$1 = b;
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
`````

## Output

`````js filename=intro

`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
