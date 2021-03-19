# Preval test case

# if_else1.md

> Normalize > Dce > Return > If else1
>
> Any statements that follow a return in the same parent should be eliminated.

#TODO

## Input

`````js filename=intro
function f() {
  if ($(1)) {
    return 2;
    $('fail');
  }
  else {
    return 3;
    $('fail');
  }
  $('fail');
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  if ($(1)) {
    return 2;
    $('fail');
  } else {
    return 3;
    $('fail');
  }
  $('fail');
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  const tmpIfTest = $(1);
  const tmpBranchingA = function (tmpIfTest$1) {
    return 2;
  };
  const tmpBranchingB = function (tmpIfTest$2) {
    return 3;
  };
  const tmpBranchingC = function (tmpIfTest$3) {
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
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    return 2;
  } else {
    return 3;
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
 - 2: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
