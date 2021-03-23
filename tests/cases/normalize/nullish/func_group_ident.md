# Preval test case

# func_group_ident.md

> Normalize > Nullish > Func group ident
>
> This is sort of what we transform into, with a trailing ident

## Input

`````js filename=intro
function f() {
  const a = {x: 1}
  const y = (1, a)??x
  return $(y);
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  const a = { x: 1 };
  const y = (1, a) ?? x;
  return $(y);
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  const a = { x: 1 };
  let y = a;
  const tmpIfTest = y == null;
  const tmpBranchingA = function ($$0, $$1, $$2) {
    let a$1 = $$0;
    let y$1 = $$1;
    let tmpIfTest$1 = $$2;
    debugger;
    y$1 = x;
    const tmpReturnArg = tmpBranchingC(a$1, y$1, tmpIfTest$1);
    return tmpReturnArg;
  };
  const tmpBranchingB = function ($$0, $$1, $$2) {
    let a$2 = $$0;
    let y$2 = $$1;
    let tmpIfTest$2 = $$2;
    debugger;
    const tmpReturnArg$1 = tmpBranchingC(a$2, y$2, tmpIfTest$2);
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function ($$0, $$1, $$2) {
    let a$3 = $$0;
    let y$3 = $$1;
    let tmpIfTest$3 = $$2;
    debugger;
    const tmpReturnArg$2 = $(y$3);
    return tmpReturnArg$2;
  };
  if (tmpIfTest) {
    const tmpReturnArg$3 = tmpBranchingA(a, y, tmpIfTest);
    return tmpReturnArg$3;
  } else {
    const tmpReturnArg$4 = tmpBranchingB(a, y, tmpIfTest);
    return tmpReturnArg$4;
  }
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function () {
  debugger;
  const a = { x: 1 };
  const tmpIfTest = a == null;
  if (tmpIfTest) {
    const SSA_y$1 = x;
    const tmpReturnArg = $(SSA_y$1);
    return tmpReturnArg;
  } else {
    const tmpReturnArg$4 = $(a);
    return tmpReturnArg$4;
  }
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Globals

BAD@! Found 1 implicit global bindings:

x

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: { x: '1' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
