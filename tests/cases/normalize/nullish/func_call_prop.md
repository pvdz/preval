# Preval test case

# func_call_prop.md

> Normalize > Nullish > Func call prop
>
> Ident property access should not be changed

## Input

`````js filename=intro
function f() {
  return $(parseInt(15)??foo);
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  return $(parseInt(15) ?? foo);
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  const tmpCallCallee = $;
  let tmpCalleeParam = parseInt(15);
  const tmpIfTest = tmpCalleeParam == null;
  const tmpBranchingA = function ($$0, $$1, $$2) {
    let tmpCallCallee$1 = $$0;
    let tmpCalleeParam$1 = $$1;
    let tmpIfTest$1 = $$2;
    debugger;
    tmpCalleeParam$1 = foo;
    const tmpReturnArg$2 = tmpBranchingC(tmpCallCallee$1, tmpCalleeParam$1, tmpIfTest$1);
    return tmpReturnArg$2;
  };
  const tmpBranchingB = function ($$0, $$1, $$2) {
    let tmpCallCallee$2 = $$0;
    let tmpCalleeParam$2 = $$1;
    let tmpIfTest$2 = $$2;
    debugger;
    const tmpReturnArg$3 = tmpBranchingC(tmpCallCallee$2, tmpCalleeParam$2, tmpIfTest$2);
    return tmpReturnArg$3;
  };
  const tmpBranchingC = function ($$0, $$1, $$2) {
    let tmpCallCallee$3 = $$0;
    let tmpCalleeParam$3 = $$1;
    let tmpIfTest$3 = $$2;
    debugger;
    const tmpReturnArg$1 = tmpCallCallee$3(tmpCalleeParam$3);
    return tmpReturnArg$1;
  };
  if (tmpIfTest) {
    const tmpReturnArg$4 = tmpBranchingA(tmpCallCallee, tmpCalleeParam, tmpIfTest);
    return tmpReturnArg$4;
  } else {
    const tmpReturnArg$5 = tmpBranchingB(tmpCallCallee, tmpCalleeParam, tmpIfTest);
    return tmpReturnArg$5;
  }
};
const tmpCallCallee$4 = $;
const tmpCalleeParam$4 = f();
tmpCallCallee$4(tmpCalleeParam$4);
`````

## Output

`````js filename=intro
const f = function () {
  debugger;
  const tmpCalleeParam = parseInt(15);
  const tmpIfTest = tmpCalleeParam == null;
  if (tmpIfTest) {
    const SSA_tmpCalleeParam$1 = foo;
    const tmpReturnArg$2 = $(SSA_tmpCalleeParam$1);
    return tmpReturnArg$2;
  } else {
    const tmpReturnArg$5 = $(tmpCalleeParam);
    return tmpReturnArg$5;
  }
};
const tmpCalleeParam$4 = f();
$(tmpCalleeParam$4);
`````

## Globals

BAD@! Found 1 implicit global bindings:

foo

## Result

Should call `$` with:
 - 1: 15
 - 2: 15
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
