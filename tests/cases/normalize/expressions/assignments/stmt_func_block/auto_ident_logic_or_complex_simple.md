# Preval test case

# auto_ident_logic_or_complex_simple.md

> Normalize > Expressions > Assignments > Stmt func block > Auto ident logic or complex simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  {
    let a = { a: 999, b: 1000 };
    a = $($(0)) || 2;
    $(a);
  }
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  {
    let a = { a: 999, b: 1000 };
    a = $($(0)) || 2;
    $(a);
  }
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  let a = { a: 999, b: 1000 };
  const tmpCallCallee = $;
  const tmpCalleeParam = $(0);
  a = tmpCallCallee(tmpCalleeParam);
  const tmpBranchingA = function (a$1, tmpCallCallee$1, tmpCalleeParam$1) {
    const tmpReturnArg = tmpBranchingC(a$1, tmpCallCallee$1, tmpCalleeParam$1);
    return tmpReturnArg;
  };
  const tmpBranchingB = function (a$2, tmpCallCallee$2, tmpCalleeParam$2) {
    a$2 = 2;
    const tmpReturnArg$1 = tmpBranchingC(a$2, tmpCallCallee$2, tmpCalleeParam$2);
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function (a$3, tmpCallCallee$3, tmpCalleeParam$3) {
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
const tmpCallCallee$4 = $;
const tmpCalleeParam$4 = f();
tmpCallCallee$4(tmpCalleeParam$4);
`````

## Output

`````js filename=intro
const f = function () {
  const tmpCalleeParam = $(0);
  const SSA_a = $(tmpCalleeParam);
  if (SSA_a) {
    $(SSA_a);
    return undefined;
  } else {
    $(2);
    return undefined;
  }
};
const tmpCalleeParam$4 = f();
$(tmpCalleeParam$4);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - 2: 0
 - 3: 2
 - 4: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
