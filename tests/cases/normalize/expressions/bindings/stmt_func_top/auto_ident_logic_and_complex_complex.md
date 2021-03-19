# Preval test case

# auto_ident_logic_and_complex_complex.md

> Normalize > Expressions > Bindings > Stmt func top > Auto ident logic and complex complex
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  let a = $($(1)) && $($(2));
  $(a);
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  let a = $($(1)) && $($(2));
  $(a);
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  const tmpCallCallee = $;
  const tmpCalleeParam = $(1);
  let a = tmpCallCallee(tmpCalleeParam);
  const tmpBranchingA = function (tmpCallCallee$2, tmpCalleeParam$2, a$1) {
    const tmpCallCallee$3 = $;
    const tmpCalleeParam$3 = $(2);
    a$1 = tmpCallCallee$3(tmpCalleeParam$3);
    const tmpReturnArg = tmpBranchingC(tmpCallCallee$2, tmpCalleeParam$2, a$1);
    return tmpReturnArg;
  };
  const tmpBranchingB = function (tmpCallCallee$4, tmpCalleeParam$4, a$2) {
    const tmpReturnArg$1 = tmpBranchingC(tmpCallCallee$4, tmpCalleeParam$4, a$2);
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function (tmpCallCallee$5, tmpCalleeParam$5, a$3) {
    $(a$3);
  };
  if (a) {
    const tmpReturnArg$2 = tmpBranchingA(tmpCallCallee, tmpCalleeParam, a);
    return tmpReturnArg$2;
  } else {
    const tmpReturnArg$3 = tmpBranchingB(tmpCallCallee, tmpCalleeParam, a);
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
  const a = $(tmpCalleeParam);
  if (a) {
    const tmpCalleeParam$3 = $(2);
    const SSA_a$1 = $(tmpCalleeParam$3);
    $(SSA_a$1);
    return undefined;
  } else {
    $(a);
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
