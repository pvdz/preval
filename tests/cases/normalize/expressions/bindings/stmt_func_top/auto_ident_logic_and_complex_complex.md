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
  debugger;
  let a = $($(1)) && $($(2));
  $(a);
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  const tmpCallCallee = $;
  const tmpCalleeParam = $(1);
  let a = tmpCallCallee(tmpCalleeParam);
  const tmpBranchingA = function ($$0, $$1, $$2) {
    let tmpCallCallee$3 = $$0;
    let tmpCalleeParam$3 = $$1;
    let a$1 = $$2;
    debugger;
    const tmpCallCallee$5 = $;
    const tmpCalleeParam$5 = $(2);
    a$1 = tmpCallCallee$5(tmpCalleeParam$5);
    const tmpReturnArg = tmpBranchingC(tmpCallCallee$3, tmpCalleeParam$3, a$1);
    return tmpReturnArg;
  };
  const tmpBranchingB = function ($$0, $$1, $$2) {
    let tmpCallCallee$7 = $$0;
    let tmpCalleeParam$7 = $$1;
    let a$3 = $$2;
    debugger;
    const tmpReturnArg$1 = tmpBranchingC(tmpCallCallee$7, tmpCalleeParam$7, a$3);
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
  const tmpCalleeParam = $(1);
  const a = $(tmpCalleeParam);
  if (a) {
    const tmpCalleeParam$5 = $(2);
    const SSA_a$1 = $(tmpCalleeParam$5);
    $(SSA_a$1);
    return undefined;
  } else {
    $(a);
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
