# Preval test case

# auto_ident_logic_and_complex_complex.md

> Normalize > Expressions > Assignments > Return > Auto ident logic and complex complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
function f() {
  return (a = $($(1)) && $($(2)));
}
$(f());
$(a);
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  return (a = $($(1)) && $($(2)));
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
  const tmpCalleeParam = $(1);
  a = tmpCallCallee(tmpCalleeParam);
  const tmpBranchingA = function ($$0, $$1) {
    let tmpCallCallee$3 = $$0;
    let tmpCalleeParam$3 = $$1;
    debugger;
    const tmpCallCallee$5 = $;
    const tmpCalleeParam$5 = $(2);
    a = tmpCallCallee$5(tmpCalleeParam$5);
    const tmpReturnArg$3 = tmpBranchingC(tmpCallCallee$3, tmpCalleeParam$3);
    return tmpReturnArg$3;
  };
  const tmpBranchingB = function ($$0, $$1) {
    let tmpCallCallee$7 = $$0;
    let tmpCalleeParam$7 = $$1;
    debugger;
    const tmpReturnArg$5 = tmpBranchingC(tmpCallCallee$7, tmpCalleeParam$7);
    return tmpReturnArg$5;
  };
  const tmpBranchingC = function ($$0, $$1) {
    let tmpCallCallee$9 = $$0;
    let tmpCalleeParam$9 = $$1;
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
const tmpCallCallee$11 = $;
const tmpCalleeParam$11 = f();
tmpCallCallee$11(tmpCalleeParam$11);
$(a);
`````

## Output

`````js filename=intro
const f = function () {
  debugger;
  const tmpCalleeParam = $(1);
  a = $(tmpCalleeParam);
  const tmpBranchingC = function () {
    debugger;
    const tmpReturnArg$1 = a;
    return tmpReturnArg$1;
  };
  if (a) {
    const tmpCalleeParam$5 = $(2);
    a = $(tmpCalleeParam$5);
    const tmpReturnArg$3 = tmpBranchingC();
    return tmpReturnArg$3;
  } else {
    const tmpReturnArg$9 = tmpBranchingC();
    return tmpReturnArg$9;
  }
};
let a = { a: 999, b: 1000 };
const tmpCalleeParam$11 = f();
$(tmpCalleeParam$11);
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
 - 5: 2
 - 6: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
