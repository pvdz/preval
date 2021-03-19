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
  return $($(1)) && $($(2));
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
  const tmpBranchingA = function (tmpCallCallee$2, tmpCalleeParam$2, tmpReturnArg$1) {
    const tmpCallCallee$3 = $;
    const tmpCalleeParam$3 = $(2);
    tmpReturnArg$1 = tmpCallCallee$3(tmpCalleeParam$3);
    const tmpReturnArg$4 = tmpBranchingC(tmpCallCallee$2, tmpCalleeParam$2, tmpReturnArg$1);
    return tmpReturnArg$4;
  };
  const tmpBranchingB = function (tmpCallCallee$4, tmpCalleeParam$4, tmpReturnArg$2) {
    const tmpReturnArg$5 = tmpBranchingC(tmpCallCallee$4, tmpCalleeParam$4, tmpReturnArg$2);
    return tmpReturnArg$5;
  };
  const tmpBranchingC = function (tmpCallCallee$5, tmpCalleeParam$5, tmpReturnArg$3) {
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
const tmpCallCallee$6 = $;
const tmpCalleeParam$6 = f();
tmpCallCallee$6(tmpCalleeParam$6);
$(a);
`````

## Output

`````js filename=intro
const f = function () {
  const tmpCalleeParam = $(1);
  const tmpReturnArg = $(tmpCalleeParam);
  if (tmpReturnArg) {
    const tmpCalleeParam$3 = $(2);
    const SSA_tmpReturnArg$1 = $(tmpCalleeParam$3);
    return SSA_tmpReturnArg$1;
  } else {
    return tmpReturnArg;
  }
};
const a = { a: 999, b: 1000 };
const tmpCalleeParam$6 = f();
$(tmpCalleeParam$6);
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
