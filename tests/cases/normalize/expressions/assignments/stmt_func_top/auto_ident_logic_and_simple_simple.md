# Preval test case

# auto_ident_logic_and_simple_simple.md

> Normalize > Expressions > Assignments > Stmt func top > Auto ident logic and simple simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  let a = { a: 999, b: 1000 };
  a = 1 && 2;
  $(a);
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  let a = { a: 999, b: 1000 };
  a = 1 && 2;
  $(a);
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  let a = { a: 999, b: 1000 };
  a = 1;
  const tmpBranchingA = function ($$0) {
    let a$1 = $$0;
    debugger;
    a$1 = 2;
    const tmpReturnArg = tmpBranchingC(a$1);
    return tmpReturnArg;
  };
  const tmpBranchingB = function ($$0) {
    let a$3 = $$0;
    debugger;
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
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
$(2);
$(undefined);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
