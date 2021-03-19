# Preval test case

# auto_ident_logic_and_complex_simple.md

> Normalize > Expressions > Assignments > Return > Auto ident logic and complex simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
function f() {
  return (a = $($(1)) && 2);
}
$(f());
$(a);
`````

## Pre Normal

`````js filename=intro
let f = function () {
  return (a = $($(1)) && 2);
};
let a = { a: 999, b: 1000 };
$(f());
$(a);
`````

## Normalized

`````js filename=intro
let f = function () {
  const tmpCallCallee = $;
  const tmpCalleeParam = $(1);
  a = tmpCallCallee(tmpCalleeParam);
  const tmpBranchingA = function (tmpCallCallee$1, tmpCalleeParam$1) {
    a = 2;
    const tmpReturnArg$2 = tmpBranchingC(tmpCallCallee$1, tmpCalleeParam$1);
    return tmpReturnArg$2;
  };
  const tmpBranchingB = function (tmpCallCallee$2, tmpCalleeParam$2) {
    const tmpReturnArg$3 = tmpBranchingC(tmpCallCallee$2, tmpCalleeParam$2);
    return tmpReturnArg$3;
  };
  const tmpBranchingC = function (tmpCallCallee$3, tmpCalleeParam$3) {
    let tmpReturnArg$1 = a;
    return tmpReturnArg$1;
  };
  if (a) {
    const tmpReturnArg$4 = tmpBranchingA(tmpCallCallee, tmpCalleeParam);
    return tmpReturnArg$4;
  } else {
    const tmpReturnArg$5 = tmpBranchingB(tmpCallCallee, tmpCalleeParam);
    return tmpReturnArg$5;
  }
};
let a = { a: 999, b: 1000 };
const tmpCallCallee$4 = $;
const tmpCalleeParam$4 = f();
tmpCallCallee$4(tmpCalleeParam$4);
$(a);
`````

## Output

`````js filename=intro
const f = function () {
  const tmpCalleeParam = $(1);
  a = $(tmpCalleeParam);
  const tmpBranchingC = function () {
    const tmpReturnArg$1 = a;
    return tmpReturnArg$1;
  };
  if (a) {
    a = 2;
    const tmpReturnArg$2 = tmpBranchingC();
    return tmpReturnArg$2;
  } else {
    const tmpReturnArg$5 = tmpBranchingC();
    return tmpReturnArg$5;
  }
};
let a = { a: 999, b: 1000 };
const tmpCalleeParam$4 = f();
$(tmpCalleeParam$4);
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 2
 - 4: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
