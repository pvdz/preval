# Preval test case

# auto_ident_logic_or_complex_simple.md

> Normalize > Expressions > Assignments > Return > Auto ident logic or complex simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
function f() {
  return (a = $($(0)) || 2);
}
$(f());
$(a);
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  return (a = $($(0)) || 2);
};
let a = { a: 999, b: 1000 };
$(f());
$(a);
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  const tmpCallCallee = $;
  const tmpCalleeParam = $(0);
  a = tmpCallCallee(tmpCalleeParam);
  const tmpBranchingA = function ($$0, $$1) {
    let tmpCallCallee$1 = $$0;
    let tmpCalleeParam$1 = $$1;
    debugger;
    const tmpReturnArg$3 = tmpBranchingC(tmpCallCallee$1, tmpCalleeParam$1);
    return tmpReturnArg$3;
  };
  const tmpBranchingB = function ($$0, $$1) {
    let tmpCallCallee$3 = $$0;
    let tmpCalleeParam$3 = $$1;
    debugger;
    a = 2;
    const tmpReturnArg$5 = tmpBranchingC(tmpCallCallee$3, tmpCalleeParam$3);
    return tmpReturnArg$5;
  };
  const tmpBranchingC = function ($$0, $$1) {
    let tmpCallCallee$5 = $$0;
    let tmpCalleeParam$5 = $$1;
    debugger;
    let tmpReturnArg$1 = a;
    return tmpReturnArg$1;
  };
  if (a) {
    const tmpReturnArg$7 = tmpBranchingA(tmpCallCallee, tmpCalleeParam);
    return tmpReturnArg$7;
  } else {
    const tmpReturnArg$9 = tmpBranchingB(tmpCallCallee, tmpCalleeParam);
    return tmpReturnArg$9;
  }
};
let a = { a: 999, b: 1000 };
const tmpCallCallee$7 = $;
const tmpCalleeParam$7 = f();
tmpCallCallee$7(tmpCalleeParam$7);
$(a);
`````

## Output

`````js filename=intro
const tmpBranchingC = function () {
  debugger;
  const tmpReturnArg$1 = a;
  return tmpReturnArg$1;
};
const f = function () {
  debugger;
  const tmpCalleeParam = $(0);
  a = $(tmpCalleeParam);
  if (a) {
    const tmpReturnArg$7 = tmpBranchingC();
    return tmpReturnArg$7;
  } else {
    a = 2;
    const tmpReturnArg$5 = tmpBranchingC();
    return tmpReturnArg$5;
  }
};
let a = { a: 999, b: 1000 };
const tmpCalleeParam$7 = f();
$(tmpCalleeParam$7);
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - 2: 0
 - 3: 2
 - 4: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
