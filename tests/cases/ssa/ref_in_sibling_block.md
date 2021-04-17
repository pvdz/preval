# Preval test case

# ref_in_sibling_block.md

> Ssa > Ref in sibling block
>
> What happens if there are future refs but they are in a sibling branch

#TODO

## Input

`````js filename=intro
function f() {
  let x = $(1);
  if ($) {
    if (a) {
      x = $(2);
      $(x);
    }
    {
      $(x);
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
    if (a) {
      x = $(2);
      $(x);
    }
    {
      $(x);
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
      const tmpReturnArg$1 = tmpBranchingC$1();
      return tmpReturnArg$1;
    };
    const tmpBranchingC$1 = function () {
      debugger;
      $(x);
      const tmpReturnArg$3 = tmpBranchingC();
      return tmpReturnArg$3;
    };
    if (a) {
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
const f = function () {
  debugger;
  const tmpBranchingC$1 = function () {
    debugger;
    $(x);
    return undefined;
  };
  let x = $(1);
  const tmpBranchingA = function () {
    debugger;
    if (a) {
      x = $(2);
      $(x);
      tmpBranchingC$1();
      return undefined;
    } else {
      tmpBranchingC$1();
      return undefined;
    }
  };
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

BAD@! Found 1 implicit global bindings:

a

## Result

Should call `$` with:
 - 1: 1
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
