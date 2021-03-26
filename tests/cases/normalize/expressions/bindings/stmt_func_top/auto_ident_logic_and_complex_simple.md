# Preval test case

# auto_ident_logic_and_complex_simple.md

> Normalize > Expressions > Bindings > Stmt func top > Auto ident logic and complex simple
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  let a = $($(1)) && 2;
  $(a);
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  let a = $($(1)) && 2;
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
    let tmpCallCallee$1 = $$0;
    let tmpCalleeParam$1 = $$1;
    let a$1 = $$2;
    debugger;
    a$1 = 2;
    const tmpReturnArg = tmpBranchingC(tmpCallCallee$1, tmpCalleeParam$1, a$1);
    return tmpReturnArg;
  };
  const tmpBranchingB = function ($$0, $$1, $$2) {
    let tmpCallCallee$3 = $$0;
    let tmpCalleeParam$3 = $$1;
    let a$3 = $$2;
    debugger;
    const tmpReturnArg$1 = tmpBranchingC(tmpCallCallee$3, tmpCalleeParam$3, a$3);
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function ($$0, $$1, $$2) {
    let tmpCallCallee$5 = $$0;
    let tmpCalleeParam$5 = $$1;
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
const tmpCallCallee$7 = $;
const tmpCalleeParam$7 = f();
tmpCallCallee$7(tmpCalleeParam$7);
`````

## Output

`````js filename=intro
const f = function () {
  debugger;
  const tmpCalleeParam = $(1);
  const a = $(tmpCalleeParam);
  if (a) {
    $(2);
    return undefined;
  } else {
    $(a);
    return undefined;
  }
};
const tmpCalleeParam$7 = f();
$(tmpCalleeParam$7);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 2
 - 4: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
