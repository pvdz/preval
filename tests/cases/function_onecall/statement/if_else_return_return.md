# Preval test case

# if_else_return_return.md

> Function onecall > Statement > If else return return
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
f();
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  if ($()) {
    $(0);
  } else {
    return $(1);
  }
  return $(2);
};
f();
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  const tmpIfTest = $();
  const tmpBranchingA = function ($$0) {
    let tmpIfTest$1 = $$0;
    debugger;
    $(0);
    const tmpReturnArg$3 = tmpBranchingC(tmpIfTest$1);
    return tmpReturnArg$3;
  };
  const tmpBranchingB = function ($$0) {
    let tmpIfTest$3 = $$0;
    debugger;
    const tmpReturnArg$1 = $(1);
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function ($$0) {
    let tmpIfTest$5 = $$0;
    debugger;
    const tmpReturnArg$5 = $(2);
    return tmpReturnArg$5;
  };
  if (tmpIfTest) {
    const tmpReturnArg$7 = tmpBranchingA(tmpIfTest);
    return tmpReturnArg$7;
  } else {
    const tmpReturnArg$9 = tmpBranchingB(tmpIfTest);
    return tmpReturnArg$9;
  }
};
f();
`````

## Output

`````js filename=intro
const tmpIfTest = $();
if (tmpIfTest) {
  $(0);
  $(2);
} else {
  $(1);
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 
 - 2: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
