# Preval test case

# auto_ident_logic_or_complex_complex.md

> Normalize > Expressions > Bindings > Stmt func block > Auto ident logic or complex complex
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  {
    let a = $($(0)) || $($(2));
    $(a);
  }
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  {
    let a = $($(0)) || $($(2));
    $(a);
  }
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  const tmpCallCallee = $;
  const tmpCalleeParam = $(0);
  let a = tmpCallCallee(tmpCalleeParam);
  const tmpBranchingA = function ($$0, $$1, $$2) {
    let tmpCallCallee$3 = $$0;
    let tmpCalleeParam$3 = $$1;
    let a$1 = $$2;
    debugger;
    const tmpReturnArg = tmpBranchingC(tmpCallCallee$3, tmpCalleeParam$3, a$1);
    return tmpReturnArg;
  };
  const tmpBranchingB = function ($$0, $$1, $$2) {
    let tmpCallCallee$5 = $$0;
    let tmpCalleeParam$5 = $$1;
    let a$3 = $$2;
    debugger;
    const tmpCallCallee$7 = $;
    const tmpCalleeParam$7 = $(2);
    a$3 = tmpCallCallee$7(tmpCalleeParam$7);
    const tmpReturnArg$1 = tmpBranchingC(tmpCallCallee$5, tmpCalleeParam$5, a$3);
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function ($$0, $$1, $$2) {
    let tmpCallCallee$9 = $$0;
    let tmpCalleeParam$9 = $$1;
    let a$5 = $$2;
    debugger;
    $(a$5);
  };
  if (a) {
    const tmpReturnArg$3 = tmpBranchingA(tmpCallCallee, tmpCalleeParam, a);
    return tmpReturnArg$3;
  } else {
    const tmpReturnArg$5 = tmpBranchingB(tmpCallCallee, tmpCalleeParam, a);
    return tmpReturnArg$5;
  }
};
const tmpCallCallee$11 = $;
const tmpCalleeParam$11 = f();
tmpCallCallee$11(tmpCalleeParam$11);
`````

## Output

`````js filename=intro
const f = function () {
  debugger;
  const tmpCalleeParam = $(0);
  const a = $(tmpCalleeParam);
  if (a) {
    $(a);
    return undefined;
  } else {
    const tmpCalleeParam$7 = $(2);
    const SSA_a$3 = $(tmpCalleeParam$7);
    $(SSA_a$3);
    return undefined;
  }
};
const tmpCalleeParam$11 = f();
$(tmpCalleeParam$11);
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
