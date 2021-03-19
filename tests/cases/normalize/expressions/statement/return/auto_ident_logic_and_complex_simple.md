# Preval test case

# auto_ident_logic_and_complex_simple.md

> Normalize > Expressions > Statement > Return > Auto ident logic and complex simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
function f() {
  return $($(1)) && 2;
}
$(f());
$(a);
`````

## Pre Normal

`````js filename=intro
let f = function () {
  return $($(1)) && 2;
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
  let tmpReturnArg = tmpCallCallee(tmpCalleeParam);
  const tmpBranchingA = function (tmpCallCallee$1, tmpCalleeParam$1, tmpReturnArg$1) {
    tmpReturnArg$1 = 2;
    const tmpReturnArg$4 = tmpBranchingC(tmpCallCallee$1, tmpCalleeParam$1, tmpReturnArg$1);
    return tmpReturnArg$4;
  };
  const tmpBranchingB = function (tmpCallCallee$2, tmpCalleeParam$2, tmpReturnArg$2) {
    const tmpReturnArg$5 = tmpBranchingC(tmpCallCallee$2, tmpCalleeParam$2, tmpReturnArg$2);
    return tmpReturnArg$5;
  };
  const tmpBranchingC = function (tmpCallCallee$3, tmpCalleeParam$3, tmpReturnArg$3) {
    return tmpReturnArg$3;
  };
  if (tmpReturnArg) {
    const tmpReturnArg$6 = tmpBranchingA(tmpCallCallee, tmpCalleeParam, tmpReturnArg);
    return tmpReturnArg$6;
  } else {
    const tmpReturnArg$7 = tmpBranchingB(tmpCallCallee, tmpCalleeParam, tmpReturnArg);
    return tmpReturnArg$7;
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
  const tmpReturnArg = $(tmpCalleeParam);
  if (tmpReturnArg) {
    return 2;
  } else {
    return tmpReturnArg;
  }
};
const a = { a: 999, b: 1000 };
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
 - 4: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
