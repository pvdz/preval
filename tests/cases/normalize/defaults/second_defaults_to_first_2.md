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
let f = function ($$0, $$1) {
  const tmpParamBare = $$0;
  const tmpParamBare$1 = $$1;
  debugger;
  let a = tmpParamBare === undefined ? 1 : tmpParamBare;
  let b = tmpParamBare$1 === undefined ? a : tmpParamBare$1;
};
f();
`````

## Normalized

`````js filename=intro
let f = function ($$0, $$1) {
  const tmpParamBare = $$0;
  const tmpParamBare$1 = $$1;
  debugger;
  let a = undefined;
  const tmpIfTest = tmpParamBare === undefined;
  const tmpBranchingA = function ($$0, $$1, $$2, $$3) {
    let tmpParamBare$2 = $$0;
    let tmpParamBare$3 = $$1;
    let a$1 = $$2;
    let tmpIfTest$1 = $$3;
    debugger;
    a$1 = 1;
    const tmpReturnArg = tmpBranchingC(tmpParamBare$2, tmpParamBare$3, a$1, tmpIfTest$1);
    return tmpReturnArg;
  };
  const tmpBranchingB = function ($$0, $$1, $$2, $$3) {
    let tmpParamBare$4 = $$0;
    let tmpParamBare$5 = $$1;
    let a$2 = $$2;
    let tmpIfTest$2 = $$3;
    debugger;
    a$2 = tmpParamBare$4;
    const tmpReturnArg$1 = tmpBranchingC(tmpParamBare$4, tmpParamBare$5, a$2, tmpIfTest$2);
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function ($$0, $$1, $$2, $$3) {
    let tmpParamBare$6 = $$0;
    let tmpParamBare$7 = $$1;
    let a$3 = $$2;
    let tmpIfTest$3 = $$3;
    debugger;
    let b$1 = undefined;
    const tmpIfTest$4 = tmpParamBare$7 === undefined;
    if (tmpIfTest$4) {
      b$1 = a$3;
    } else {
      b$1 = tmpParamBare$7;
    }
  };
  if (tmpIfTest) {
    const tmpReturnArg$2 = tmpBranchingA(tmpParamBare, tmpParamBare$1, a, tmpIfTest);
    return tmpReturnArg$2;
  } else {
    const tmpReturnArg$3 = tmpBranchingB(tmpParamBare, tmpParamBare$1, a, tmpIfTest);
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
