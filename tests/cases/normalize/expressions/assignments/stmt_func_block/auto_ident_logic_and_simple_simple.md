# Preval test case

# auto_ident_logic_and_simple_simple.md

> Normalize > Expressions > Assignments > Stmt func block > Auto ident logic and simple simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  {
    let a = { a: 999, b: 1000 };
    a = 1 && 2;
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
    a = 1 && 2;
    $(a);
  }
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  let a = { a: 999, b: 1000 };
  a = 1;
  const tmpBranchingA = function (a$1) {
    a$1 = 2;
    const tmpReturnArg = tmpBranchingC(a$1);
    return tmpReturnArg;
  };
  const tmpBranchingB = function (a$2) {
    const tmpReturnArg$1 = tmpBranchingC(a$2);
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function (a$3) {
    $(a$3);
  };
  if (a) {
    const tmpReturnArg$2 = tmpBranchingA(a);
    return tmpReturnArg$2;
  } else {
    const tmpReturnArg$3 = tmpBranchingB(a);
    return tmpReturnArg$3;
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
