# Preval test case

# auto_ident_logic_or_complex_simple.md

> Normalize > Expressions > Statement > Return > Auto ident logic or complex simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
function f() {
  return $($(0)) || 2;
}
$(f());
$(a);
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  return $($(0)) || 2;
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
  let tmpReturnArg = tmpCallCallee(tmpCalleeParam);
  const tmpBranchingA = function ($$0, $$1, $$2) {
    let tmpCallCallee$1 = $$0;
    let tmpCalleeParam$1 = $$1;
    let tmpReturnArg$1 = $$2;
    debugger;
    const tmpReturnArg$7 = tmpBranchingC(tmpCallCallee$1, tmpCalleeParam$1, tmpReturnArg$1);
    return tmpReturnArg$7;
  };
  const tmpBranchingB = function ($$0, $$1, $$2) {
    let tmpCallCallee$3 = $$0;
    let tmpCalleeParam$3 = $$1;
    let tmpReturnArg$3 = $$2;
    debugger;
    tmpReturnArg$3 = 2;
    const tmpReturnArg$9 = tmpBranchingC(tmpCallCallee$3, tmpCalleeParam$3, tmpReturnArg$3);
    return tmpReturnArg$9;
  };
  const tmpBranchingC = function ($$0, $$1, $$2) {
    let tmpCallCallee$5 = $$0;
    let tmpCalleeParam$5 = $$1;
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
const tmpCallCallee$7 = $;
const tmpCalleeParam$7 = f();
tmpCallCallee$7(tmpCalleeParam$7);
$(a);
`````

## Output

`````js filename=intro
const f = function () {
  debugger;
  const tmpCalleeParam = $(0);
  const tmpReturnArg = $(tmpCalleeParam);
  if (tmpReturnArg) {
    return tmpReturnArg;
  } else {
    return 2;
  }
};
const a = { a: 999, b: 1000 };
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
 - 4: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
