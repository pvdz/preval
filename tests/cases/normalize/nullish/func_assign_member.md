# Preval test case

# func_assign_member.md

> Normalize > Nullish > Func assign member
>
> Assignment of a member expression where the object is a sequence

This could appear and is most likely a transformation artifact.

## Input

`````js filename=intro
function f() {
  var y;
  y = (1, 2, $())??foo;
  return $(y);
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  let y = undefined;
  y = (1, 2, $()) ?? foo;
  return $(y);
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  let y = undefined;
  y = $();
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
const f = function () {
  debugger;
  const tmpSSA_y = $();
  const tmpIfTest = tmpSSA_y == null;
  if (tmpIfTest) {
    const tmpSSA_y$1 = foo;
    const tmpReturnArg = $(tmpSSA_y$1);
    return tmpReturnArg;
  } else {
    const tmpReturnArg$7 = $(tmpSSA_y);
    return tmpReturnArg$7;
  }
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Globals

BAD@! Found 1 implicit global bindings:

foo

## Result

Should call `$` with:
 - 1: 
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
