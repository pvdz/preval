# Preval test case

# auto_ident_logic_and_complex_complex.md

> Normalize > Expressions > Statement > Return > Auto ident logic and complex complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
function f() {
  return $($(1)) && $($(2));
}
$(f());
$(a);
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  return $($(1)) && $($(2));
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
  let tmpReturnArg = tmpCallCallee(tmpCalleeParam);
  const tmpBranchingA = function ($$0, $$1, $$2) {
    let tmpCallCallee$3 = $$0;
    let tmpCalleeParam$3 = $$1;
    let tmpReturnArg$1 = $$2;
    debugger;
    const tmpCallCallee$5 = $;
    const tmpCalleeParam$5 = $(2);
    tmpReturnArg$1 = tmpCallCallee$5(tmpCalleeParam$5);
    const tmpReturnArg$7 = tmpBranchingC(tmpCallCallee$3, tmpCalleeParam$3, tmpReturnArg$1);
    return tmpReturnArg$7;
  };
  const tmpBranchingB = function ($$0, $$1, $$2) {
    let tmpCallCallee$7 = $$0;
    let tmpCalleeParam$7 = $$1;
    let tmpReturnArg$3 = $$2;
    debugger;
    const tmpReturnArg$9 = tmpBranchingC(tmpCallCallee$7, tmpCalleeParam$7, tmpReturnArg$3);
    return tmpReturnArg$9;
  };
  const tmpBranchingC = function ($$0, $$1, $$2) {
    let tmpCallCallee$9 = $$0;
    let tmpCalleeParam$9 = $$1;
    let tmpReturnArg$5 = $$2;
    debugger;
    return tmpReturnArg$5;
  };
  if (tmpReturnArg) {
    const tmpReturnArg$11 = tmpBranchingA(tmpCallCallee, tmpCalleeParam, tmpReturnArg);
    return tmpReturnArg$11;
  } else {
    const tmpReturnArg$13 = tmpBranchingB(tmpCallCallee, tmpCalleeParam, tmpReturnArg);
    return tmpReturnArg$13;
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
  const tmpReturnArg = $(tmpCalleeParam);
  if (tmpReturnArg) {
    const tmpCalleeParam$5 = $(2);
    const SSA_tmpReturnArg$1 = $(tmpCalleeParam$5);
    return SSA_tmpReturnArg$1;
  } else {
    return tmpReturnArg;
  }
};
const a = { a: 999, b: 1000 };
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
 - 6: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
