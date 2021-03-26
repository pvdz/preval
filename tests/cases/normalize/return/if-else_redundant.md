# Preval test case

# if-else_redundant.md

> Normalize > Return > If-else redundant
>
> Unused return statements should be eliminated

This is regular DCE

#TODO

## Input

`````js filename=intro
function f() {
  if ($(1)) return $(1);
  else return $(2);
  return;
}

$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  if ($(1)) return $(1);
  else return $(2);
  return;
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
    const tmpReturnArg$3 = $(1);
    return tmpReturnArg$3;
  };
  const tmpBranchingB = function ($$0) {
    let tmpIfTest$3 = $$0;
    debugger;
    const tmpReturnArg$5 = $(2);
    return tmpReturnArg$5;
  };
  const tmpBranchingC = function ($$0) {
    let tmpIfTest$5 = $$0;
    debugger;
  };
  if (tmpIfTest) {
    const tmpReturnArg$7 = tmpBranchingA(tmpIfTest);
    return tmpReturnArg$7;
  } else {
    const tmpReturnArg$9 = tmpBranchingB(tmpIfTest);
    return tmpReturnArg$9;
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
    const tmpReturnArg$7 = $(1);
    return tmpReturnArg$7;
  } else {
    const tmpReturnArg$9 = $(2);
    return tmpReturnArg$9;
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
 - 2: 1
 - 3: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
