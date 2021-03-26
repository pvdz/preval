# Preval test case

# if_return_return.md

> Function onecall > Statement > If return return
>
> Return inlining

#TODO

## Input

`````js filename=intro
function f() {
  if ($()) {
    $(1);
  }
  $(2);
}
f();
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  if ($()) {
    $(1);
  }
  $(2);
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
    $(1);
    const tmpReturnArg = tmpBranchingC(tmpIfTest$1);
    return tmpReturnArg;
  };
  const tmpBranchingB = function ($$0) {
    let tmpIfTest$3 = $$0;
    debugger;
    const tmpReturnArg$1 = tmpBranchingC(tmpIfTest$3);
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function ($$0) {
    let tmpIfTest$5 = $$0;
    debugger;
    $(2);
  };
  if (tmpIfTest) {
    const tmpReturnArg$3 = tmpBranchingA(tmpIfTest);
    return tmpReturnArg$3;
  } else {
    const tmpReturnArg$5 = tmpBranchingB(tmpIfTest);
    return tmpReturnArg$5;
  }
};
f();
`````

## Output

`````js filename=intro
const tmpIfTest = $();
if (tmpIfTest) {
  $(1);
  $(2);
} else {
  $(2);
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 
 - 2: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
