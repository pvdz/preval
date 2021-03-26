# Preval test case

# auto_ident_logic_||_simple_complex.md

> Normalize > Expressions > Bindings > Stmt func top > Auto ident logic || simple complex
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  let a = 0 || $($(1));
  $(a);
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  let a = 0 || $($(1));
  $(a);
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  let a = 0;
  const tmpBranchingA = function ($$0) {
    let a$1 = $$0;
    debugger;
    const tmpReturnArg = tmpBranchingC(a$1);
    return tmpReturnArg;
  };
  const tmpBranchingB = function ($$0) {
    let a$3 = $$0;
    debugger;
    const tmpCallCallee$1 = $;
    const tmpCalleeParam$1 = $(1);
    a$3 = tmpCallCallee$1(tmpCalleeParam$1);
    const tmpReturnArg$1 = tmpBranchingC(a$3);
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function ($$0) {
    let a$5 = $$0;
    debugger;
    $(a$5);
  };
  if (a) {
    const tmpReturnArg$3 = tmpBranchingA(a);
    return tmpReturnArg$3;
  } else {
    const tmpReturnArg$5 = tmpBranchingB(a);
    return tmpReturnArg$5;
  }
};
const tmpCallCallee$3 = $;
const tmpCalleeParam$3 = f();
tmpCallCallee$3(tmpCalleeParam$3);
`````

## Output

`````js filename=intro
const tmpCalleeParam$1 = $(1);
const SSA_a$3 = $(tmpCalleeParam$1);
$(SSA_a$3);
$(undefined);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - 4: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
