# Preval test case

# auto_ident_logic_and_complex_complex.md

> Normalize > Expressions > Assignments > Stmt func top > Auto ident logic and complex complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  let a = { a: 999, b: 1000 };
  a = $($(1)) && $($(2));
  $(a);
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  let a = { a: 999, b: 1000 };
  a = $($(1)) && $($(2));
  $(a);
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  let a = { a: 999, b: 1000 };
  const tmpCallCallee = $;
  const tmpCalleeParam = $(1);
  a = tmpCallCallee(tmpCalleeParam);
  const tmpBranchingA = function (a$1, tmpCallCallee$2, tmpCalleeParam$2) {
    const tmpCallCallee$3 = $;
    const tmpCalleeParam$3 = $(2);
    a$1 = tmpCallCallee$3(tmpCalleeParam$3);
    const tmpReturnArg = tmpBranchingC(a$1, tmpCallCallee$2, tmpCalleeParam$2);
    return tmpReturnArg;
  };
  const tmpBranchingB = function (a$2, tmpCallCallee$4, tmpCalleeParam$4) {
    const tmpReturnArg$1 = tmpBranchingC(a$2, tmpCallCallee$4, tmpCalleeParam$4);
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function (a$3, tmpCallCallee$5, tmpCalleeParam$5) {
    $(a$3);
  };
  if (a) {
    const tmpReturnArg$2 = tmpBranchingA(a, tmpCallCallee, tmpCalleeParam);
    return tmpReturnArg$2;
  } else {
    const tmpReturnArg$3 = tmpBranchingB(a, tmpCallCallee, tmpCalleeParam);
    return tmpReturnArg$3;
  }
};
const tmpCallCallee$6 = $;
const tmpCalleeParam$6 = f();
tmpCallCallee$6(tmpCalleeParam$6);
`````

## Output

`````js filename=intro
const f = function () {
  const tmpCalleeParam = $(1);
  const SSA_a = $(tmpCalleeParam);
  if (SSA_a) {
    const tmpCalleeParam$3 = $(2);
    const SSA_a$1 = $(tmpCalleeParam$3);
    $(SSA_a$1);
    return undefined;
  } else {
    $(SSA_a);
    return undefined;
  }
};
const tmpCalleeParam$6 = f();
$(tmpCalleeParam$6);
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
 - 6: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
