# Preval test case

# if_else_partial.md

> Normalize > Dce > Throw > If else partial
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
  $('keep, do not eval');
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  if ($(1)) {
    throw 2;
    $('fail');
  }
  $('keep, do not eval');
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  const tmpIfTest = $(1);
  const tmpBranchingA = function (tmpIfTest$1) {
    throw 2;
  };
  const tmpBranchingB = function (tmpIfTest$2) {
    const tmpReturnArg = tmpBranchingC(tmpIfTest$2);
    return tmpReturnArg;
  };
  const tmpBranchingC = function (tmpIfTest$3) {
    $('keep, do not eval');
  };
  if (tmpIfTest) {
    const tmpReturnArg$1 = tmpBranchingA(tmpIfTest);
    return tmpReturnArg$1;
  } else {
    const tmpReturnArg$2 = tmpBranchingB(tmpIfTest);
    return tmpReturnArg$2;
  }
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function () {
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    throw 2;
  } else {
    $('keep, do not eval');
    return undefined;
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
