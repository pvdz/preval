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
  let y = undefined;
  y = (1, 2, $()) ?? foo;
  return $(y);
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  let y = undefined;
  y = $();
  const tmpIfTest = y == null;
  const tmpBranchingA = function (y$1, tmpIfTest$1) {
    y$1 = foo;
    const tmpReturnArg = tmpBranchingC(y$1, tmpIfTest$1);
    return tmpReturnArg;
  };
  const tmpBranchingB = function (y$2, tmpIfTest$2) {
    const tmpReturnArg$1 = tmpBranchingC(y$2, tmpIfTest$2);
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function (y$3, tmpIfTest$3) {
    const tmpReturnArg$2 = $(y$3);
    return tmpReturnArg$2;
  };
  if (tmpIfTest) {
    const tmpReturnArg$3 = tmpBranchingA(y, tmpIfTest);
    return tmpReturnArg$3;
  } else {
    const tmpReturnArg$4 = tmpBranchingB(y, tmpIfTest);
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
  const SSA_y = $();
  const tmpIfTest = SSA_y == null;
  if (tmpIfTest) {
    const SSA_y$1 = foo;
    const tmpReturnArg = $(SSA_y$1);
    return tmpReturnArg;
  } else {
    const tmpReturnArg$4 = $(SSA_y);
    return tmpReturnArg$4;
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
