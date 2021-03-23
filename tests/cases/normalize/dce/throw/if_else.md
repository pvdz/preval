# Preval test case

# if_else.md

> Normalize > Dce > Throw > If else
>
> Any statements that follow a return in the same parent should be eliminated.

#TODO

## Input

`````js filename=intro
function f() {
  if ($(1)) throw 2;
  else throw 3;
  $('fail');
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  if ($(1)) throw 2;
  else throw 3;
  $('fail');
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
    let tmpIfTest$2 = $$0;
    debugger;
    throw 3;
  };
  const tmpBranchingC = function ($$0) {
    let tmpIfTest$3 = $$0;
    debugger;
    $('fail');
  };
  if (tmpIfTest) {
    const tmpReturnArg = tmpBranchingA(tmpIfTest);
    return tmpReturnArg;
  } else {
    const tmpReturnArg$1 = tmpBranchingB(tmpIfTest);
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
