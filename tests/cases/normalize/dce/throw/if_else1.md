# Preval test case

# if_else1.md

> Normalize > Dce > Throw > If else1
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
  else {
    throw 3;
    $('fail');
  }
  $('fail');
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
  } else {
    throw 3;
    $('fail');
  }
  $('fail');
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  const tmpIfTest = $(1);
  const tmpBranchingA = function () {
    debugger;
    throw 2;
  };
  const tmpBranchingB = function () {
    debugger;
    throw 3;
  };
  const tmpBranchingC = function () {
    debugger;
    $('fail');
  };
  if (tmpIfTest) {
    const tmpReturnArg = tmpBranchingA();
    return tmpReturnArg;
  } else {
    const tmpReturnArg$1 = tmpBranchingB();
    return tmpReturnArg$1;
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
