# Preval test case

# auto_ident_logic_or_complex_complex.md

> Normalize > Expressions > Bindings > Stmt func top > Auto ident logic or complex complex
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  let a = $($(0)) || $($(2));
  $(a);
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  let a = $($(0)) || $($(2));
  $(a);
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  const tmpCallCallee = $;
  const tmpCalleeParam = $(0);
  let a = tmpCallCallee(tmpCalleeParam);
  const tmpBranchingA = function (tmpCallCallee$2, tmpCalleeParam$2, a$1) {
    const tmpReturnArg = tmpBranchingC(tmpCallCallee$2, tmpCalleeParam$2, a$1);
    return tmpReturnArg;
  };
  const tmpBranchingB = function (tmpCallCallee$3, tmpCalleeParam$3, a$2) {
    const tmpCallCallee$4 = $;
    const tmpCalleeParam$4 = $(2);
    a$2 = tmpCallCallee$4(tmpCalleeParam$4);
    const tmpReturnArg$1 = tmpBranchingC(tmpCallCallee$3, tmpCalleeParam$3, a$2);
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
  const tmpCalleeParam = $(0);
  const a = $(tmpCalleeParam);
  if (a) {
    $(a);
    return undefined;
  } else {
    const tmpCalleeParam$4 = $(2);
    const SSA_a$2 = $(tmpCalleeParam$4);
    $(SSA_a$2);
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
 - 1: 0
 - 2: 0
 - 3: 2
 - 4: 2
 - 5: 2
 - 6: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
