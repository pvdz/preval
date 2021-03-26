# Preval test case

# if_else_partial2.md

> Normalize > Dce > Return > If else partial2
>
> Any statements that follow a return in the same parent should be eliminated.

#TODO

## Input

`````js filename=intro
function f() {
  if ($(1)) {
  } else {
    return 2;
    $('fail');
  }
  $('keep, do not eval');
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  if ($(1)) {
  } else {
    return 2;
    $('fail');
  }
  $('keep, do not eval');
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
    const tmpReturnArg = tmpBranchingC(tmpIfTest$1);
    return tmpReturnArg;
  };
  const tmpBranchingB = function ($$0) {
    let tmpIfTest$3 = $$0;
    debugger;
    return 2;
  };
  const tmpBranchingC = function ($$0) {
    let tmpIfTest$5 = $$0;
    debugger;
    $('keep, do not eval');
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
    $('keep, do not eval');
    return undefined;
  } else {
    return 2;
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
 - 2: 'keep, do not eval'
 - 3: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
