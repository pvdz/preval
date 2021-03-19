# Preval test case

# default_yes__empty_str.md

> Normalize > Pattern > Param > Ident > Default yes  empty str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f(x = 'pass') {
  return x;
}
$(f('', 200));
`````

## Pre Normal

`````js filename=intro
let f = function (tmpParamDefault) {
  let x = tmpParamDefault === undefined ? 'pass' : tmpParamDefault;
  return x;
};
$(f('', 200));
`````

## Normalized

`````js filename=intro
let f = function (tmpParamDefault) {
  let x = undefined;
  const tmpIfTest = tmpParamDefault === undefined;
  const tmpBranchingA = function (tmpParamDefault$1, x$1, tmpIfTest$1) {
    x$1 = 'pass';
    const tmpReturnArg = tmpBranchingC(tmpParamDefault$1, x$1, tmpIfTest$1);
    return tmpReturnArg;
  };
  const tmpBranchingB = function (tmpParamDefault$2, x$2, tmpIfTest$2) {
    x$2 = tmpParamDefault$2;
    const tmpReturnArg$1 = tmpBranchingC(tmpParamDefault$2, x$2, tmpIfTest$2);
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function (tmpParamDefault$3, x$3, tmpIfTest$3) {
    return x$3;
  };
  if (tmpIfTest) {
    const tmpReturnArg$2 = tmpBranchingA(tmpParamDefault, x, tmpIfTest);
    return tmpReturnArg$2;
  } else {
    const tmpReturnArg$3 = tmpBranchingB(tmpParamDefault, x, tmpIfTest);
    return tmpReturnArg$3;
  }
};
const tmpCallCallee = $;
const tmpCalleeParam = f('', 200);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function (tmpParamDefault) {
  const tmpIfTest = tmpParamDefault === undefined;
  if (tmpIfTest) {
    return 'pass';
  } else {
    return tmpParamDefault;
  }
};
const tmpCalleeParam = f('', 200);
$(tmpCalleeParam);
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
