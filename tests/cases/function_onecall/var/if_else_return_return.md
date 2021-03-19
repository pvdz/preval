# Preval test case

# if_else_return_return.md

> Function onecall > Var > If else return return
>
> Return inlining

#TODO

## Input

`````js filename=intro
function f() {
  if ($()) {
    $(0);
  } else {
    return $(1);
  }
  return $(2);
}
const x = f();
$(x);
`````

## Pre Normal

`````js filename=intro
let f = function () {
  if ($()) {
    $(0);
  } else {
    return $(1);
  }
  return $(2);
};
const x = f();
$(x);
`````

## Normalized

`````js filename=intro
let f = function () {
  const tmpIfTest = $();
  const tmpBranchingA = function (tmpIfTest$1) {
    $(0);
    const tmpReturnArg$2 = tmpBranchingC(tmpIfTest$1);
    return tmpReturnArg$2;
  };
  const tmpBranchingB = function (tmpIfTest$2) {
    const tmpReturnArg$1 = $(1);
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function (tmpIfTest$3) {
    const tmpReturnArg$3 = $(2);
    return tmpReturnArg$3;
  };
  if (tmpIfTest) {
    const tmpReturnArg$4 = tmpBranchingA(tmpIfTest);
    return tmpReturnArg$4;
  } else {
    const tmpReturnArg$5 = tmpBranchingB(tmpIfTest);
    return tmpReturnArg$5;
  }
};
const x = f();
$(x);
`````

## Output

`````js filename=intro
const f = function () {
  const tmpIfTest = $();
  if (tmpIfTest) {
    $(0);
    const tmpReturnArg$2 = $(2);
    return tmpReturnArg$2;
  } else {
    const tmpReturnArg$5 = $(1);
    return tmpReturnArg$5;
  }
};
const x = f();
$(x);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 
 - 2: 1
 - 3: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
