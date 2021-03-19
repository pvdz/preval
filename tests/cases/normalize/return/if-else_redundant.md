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
  if ($(1)) return $(1);
  else return $(2);
  return;
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  const tmpIfTest = $(1);
  const tmpBranchingA = function (tmpIfTest$1) {
    const tmpReturnArg$2 = $(1);
    return tmpReturnArg$2;
  };
  const tmpBranchingB = function (tmpIfTest$2) {
    const tmpReturnArg$3 = $(2);
    return tmpReturnArg$3;
  };
  const tmpBranchingC = function (tmpIfTest$3) {};
  if (tmpIfTest) {
    const tmpReturnArg$4 = tmpBranchingA(tmpIfTest);
    return tmpReturnArg$4;
  } else {
    const tmpReturnArg$5 = tmpBranchingB(tmpIfTest);
    return tmpReturnArg$5;
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
    const tmpReturnArg$4 = $(1);
    return tmpReturnArg$4;
  } else {
    const tmpReturnArg$5 = $(2);
    return tmpReturnArg$5;
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
