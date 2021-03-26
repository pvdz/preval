# Preval test case

# func_group_literal.md

> Normalize > Nullish > Func group literal
>
> We shouldn't transform member expressions on group ending in a literal

#TODO

## Input

`````js filename=intro
function f() {
  const y = (1, 2, 3)??foo
  return $(y);
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  const y = (1, 2, 3) ?? foo;
  return $(y);
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  let y = 3;
  const tmpIfTest = y == null;
  const tmpBranchingA = function ($$0, $$1) {
    let y$1 = $$0;
    let tmpIfTest$1 = $$1;
    debugger;
    y$1 = foo;
    const tmpReturnArg = tmpBranchingC(y$1, tmpIfTest$1);
    return tmpReturnArg;
  };
  const tmpBranchingB = function ($$0, $$1) {
    let y$3 = $$0;
    let tmpIfTest$3 = $$1;
    debugger;
    const tmpReturnArg$1 = tmpBranchingC(y$3, tmpIfTest$3);
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function ($$0, $$1) {
    let y$5 = $$0;
    let tmpIfTest$5 = $$1;
    debugger;
    const tmpReturnArg$3 = $(y$5);
    return tmpReturnArg$3;
  };
  if (tmpIfTest) {
    const tmpReturnArg$5 = tmpBranchingA(y, tmpIfTest);
    return tmpReturnArg$5;
  } else {
    const tmpReturnArg$7 = tmpBranchingB(y, tmpIfTest);
    return tmpReturnArg$7;
  }
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpCalleeParam = $(3);
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 3
 - 2: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
