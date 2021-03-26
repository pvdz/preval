# Preval test case

# if_else3.md

> Normalize > Dce > Throw > If else3
>
> Any statements that follow a return in the same parent should be eliminated.

#TODO

## Input

`````js filename=intro
function f() {
  if ($(1)) {
    throw 2;
    $('fail');
  }
  throw 3;
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  if ($(1)) {
    throw 2;
    $('fail');
  }
  throw 3;
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  const tmpIfTest = $(1);
  const tmpBranchingA = function ($$0) {
    let tmpIfTest$1 = $$0;
    debugger;
    throw 2;
  };
  const tmpBranchingB = function ($$0) {
    let tmpIfTest$3 = $$0;
    debugger;
    const tmpReturnArg = tmpBranchingC(tmpIfTest$3);
    return tmpReturnArg;
  };
  const tmpBranchingC = function ($$0) {
    let tmpIfTest$5 = $$0;
    debugger;
    throw 3;
  };
  if (tmpIfTest) {
    const tmpReturnArg$1 = tmpBranchingA(tmpIfTest);
    return tmpReturnArg$1;
  } else {
    const tmpReturnArg$3 = tmpBranchingB(tmpIfTest);
    return tmpReturnArg$3;
  }
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function () {
  debugger;
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    throw 2;
  } else {
    throw 3;
  }
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - eval returned: ('<crash[ 2 ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
