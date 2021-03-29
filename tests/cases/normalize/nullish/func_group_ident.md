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
    let a$3 = $$0;
    let y$3 = $$1;
    let tmpIfTest$3 = $$2;
    debugger;
    const tmpReturnArg$1 = tmpBranchingC(a$3, y$3, tmpIfTest$3);
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function ($$0, $$1, $$2) {
    let a$5 = $$0;
    let y$5 = $$1;
    let tmpIfTest$5 = $$2;
    debugger;
    const tmpReturnArg$3 = $(y$5);
    return tmpReturnArg$3;
  };
  if (tmpIfTest) {
    const tmpReturnArg$5 = tmpBranchingA(a, y, tmpIfTest);
    return tmpReturnArg$5;
  } else {
    const tmpReturnArg$7 = tmpBranchingB(a, y, tmpIfTest);
    return tmpReturnArg$7;
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
    const tmpSSA_y$1 = x;
    const tmpReturnArg = $(tmpSSA_y$1);
    return tmpReturnArg;
  } else {
    const tmpReturnArg$7 = $(a);
    return tmpReturnArg$7;
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
