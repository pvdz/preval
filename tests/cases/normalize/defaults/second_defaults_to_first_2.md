# Preval test case

# second_defaults_to_first_2.md

> Normalize > Defaults > Second defaults to first 2
>
> Rewrite function param defaults to equivalent body code

## Input

`````js filename=intro
function f(a = 1, b = a) { 
}

f()
`````

## Pre Normal

`````js filename=intro
let f = function (tmpParamDefault, tmpParamDefault$1) {
  let a = tmpParamDefault === undefined ? 1 : tmpParamDefault;
  let b = tmpParamDefault$1 === undefined ? a : tmpParamDefault$1;
};
f();
`````

## Normalized

`````js filename=intro
let f = function (tmpParamDefault, tmpParamDefault$1) {
  let a = undefined;
  const tmpIfTest = tmpParamDefault === undefined;
  const tmpBranchingA = function (tmpParamDefault$2, tmpParamDefault$3, a$1, tmpIfTest$1) {
    a$1 = 1;
    const tmpReturnArg = tmpBranchingC(tmpParamDefault$2, tmpParamDefault$3, a$1, tmpIfTest$1);
    return tmpReturnArg;
  };
  const tmpBranchingB = function (tmpParamDefault$4, tmpParamDefault$5, a$2, tmpIfTest$2) {
    a$2 = tmpParamDefault$4;
    const tmpReturnArg$1 = tmpBranchingC(tmpParamDefault$4, tmpParamDefault$5, a$2, tmpIfTest$2);
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function (tmpParamDefault$6, tmpParamDefault$7, a$3, tmpIfTest$3) {
    let b$1 = undefined;
    const tmpIfTest$4 = tmpParamDefault$7 === undefined;
    if (tmpIfTest$4) {
      b$1 = a$3;
    } else {
      b$1 = tmpParamDefault$7;
    }
  };
  if (tmpIfTest) {
    const tmpReturnArg$2 = tmpBranchingA(tmpParamDefault, tmpParamDefault$1, a, tmpIfTest);
    return tmpReturnArg$2;
  } else {
    const tmpReturnArg$3 = tmpBranchingB(tmpParamDefault, tmpParamDefault$1, a, tmpIfTest);
    return tmpReturnArg$3;
  }
};
f();
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
