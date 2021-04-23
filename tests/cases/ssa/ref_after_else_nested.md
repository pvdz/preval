# Preval test case

# ref_after_else_nested.md

> Ssa > Ref after else nested
>
> What happens if there are future refs but they are in a sibling branch

#TODO

## Input

`````js filename=intro
function f() {
  let x = $(1);
  if ($) {
    if ($) {
      x = $(2);
      $(x);
    } else {
      $('else');
    }
  } else {
    // Cannot reach the write but should not prevent SSA
    $(x);
  }
}
if ($) f();
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  let x = $(1);
  if ($) {
    if ($) {
      x = $(2);
      $(x);
    } else {
      $('else');
    }
  } else {
    $(x);
  }
};
if ($) f();
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  let x = $(1);
  const tmpBranchingA = function () {
    debugger;
    const tmpBranchingA$1 = function () {
      debugger;
      x = $(2);
      $(x);
      const tmpReturnArg = tmpBranchingC$1();
      return tmpReturnArg;
    };
    const tmpBranchingB$1 = function () {
      debugger;
      $('else');
      const tmpReturnArg$1 = tmpBranchingC$1();
      return tmpReturnArg$1;
    };
    const tmpBranchingC$1 = function () {
      debugger;
      const tmpReturnArg$3 = tmpBranchingC();
      return tmpReturnArg$3;
    };
    if ($) {
      const tmpReturnArg$5 = tmpBranchingA$1();
      return tmpReturnArg$5;
    } else {
      const tmpReturnArg$7 = tmpBranchingB$1();
      return tmpReturnArg$7;
    }
  };
  const tmpBranchingB = function () {
    debugger;
    $(x);
    const tmpReturnArg$9 = tmpBranchingC();
    return tmpReturnArg$9;
  };
  const tmpBranchingC = function () {
    debugger;
    return undefined;
  };
  if ($) {
    const tmpReturnArg$11 = tmpBranchingA();
    return tmpReturnArg$11;
  } else {
    const tmpReturnArg$13 = tmpBranchingB();
    return tmpReturnArg$13;
  }
};
if ($) {
  f();
} else {
}
`````

## Output

`````js filename=intro
const tmpBranchingA = function () {
  debugger;
  if ($) {
    const tmpSSA_tmpssa2_x = $(2);
    $(tmpSSA_tmpssa2_x);
    return undefined;
  } else {
    $('else');
    return undefined;
  }
};
const f = function () {
  debugger;
  const x = $(1);
  if ($) {
    tmpBranchingA();
    return undefined;
  } else {
    $(x);
    return undefined;
  }
};
if ($) {
  f();
} else {
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
