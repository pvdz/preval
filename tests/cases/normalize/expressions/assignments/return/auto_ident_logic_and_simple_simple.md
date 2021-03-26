# Preval test case

# auto_ident_logic_and_simple_simple.md

> Normalize > Expressions > Assignments > Return > Auto ident logic and simple simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
function f() {
  return (a = 1 && 2);
}
$(f());
$(a);
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  return (a = 1 && 2);
};
let a = { a: 999, b: 1000 };
$(f());
$(a);
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  a = 1;
  const tmpBranchingA = function () {
    debugger;
    a = 2;
    const tmpReturnArg$3 = tmpBranchingC();
    return tmpReturnArg$3;
  };
  const tmpBranchingB = function () {
    debugger;
    const tmpReturnArg$5 = tmpBranchingC();
    return tmpReturnArg$5;
  };
  const tmpBranchingC = function () {
    debugger;
    let tmpReturnArg$1 = a;
    return tmpReturnArg$1;
  };
  if (a) {
    const tmpReturnArg$7 = tmpBranchingA();
    return tmpReturnArg$7;
  } else {
    const tmpReturnArg$9 = tmpBranchingB();
    return tmpReturnArg$9;
  }
};
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
const f = function () {
  debugger;
  a = 1;
  const tmpBranchingC = function () {
    debugger;
    const tmpReturnArg$1 = a;
    return tmpReturnArg$1;
  };
  if (a) {
    a = 2;
    const tmpReturnArg$3 = tmpBranchingC();
    return tmpReturnArg$3;
  } else {
    const tmpReturnArg$9 = tmpBranchingC();
    return tmpReturnArg$9;
  }
};
let a = { a: 999, b: 1000 };
const tmpCalleeParam = f();
$(tmpCalleeParam);
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2
 - 2: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
