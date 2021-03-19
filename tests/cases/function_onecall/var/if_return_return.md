# Preval test case

# if_return_return.md

> Function onecall > Var > If return return
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
const x = f();
$(x);
`````

## Pre Normal

`````js filename=intro
let f = function () {
  if ($()) {
    $(1);
  }
  $(2);
};
const x = f();
$(x);
`````

## Normalized

`````js filename=intro
let f = function () {
  const tmpIfTest = $();
  const tmpBranchingA = function (tmpIfTest$1) {
    $(1);
    const tmpReturnArg = tmpBranchingC(tmpIfTest$1);
    return tmpReturnArg;
  };
  const tmpBranchingB = function (tmpIfTest$2) {
    const tmpReturnArg$1 = tmpBranchingC(tmpIfTest$2);
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function (tmpIfTest$3) {
    $(2);
  };
  if (tmpIfTest) {
    const tmpReturnArg$2 = tmpBranchingA(tmpIfTest);
    return tmpReturnArg$2;
  } else {
    const tmpReturnArg$3 = tmpBranchingB(tmpIfTest);
    return tmpReturnArg$3;
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
    $(1);
    $(2);
    return undefined;
  } else {
    $(2);
    return undefined;
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
 - 2: 2
 - 3: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
