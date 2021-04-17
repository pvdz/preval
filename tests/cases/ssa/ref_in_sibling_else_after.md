# Preval test case

# ref_in_sibling_else_after.md

> Ssa > Ref in sibling else after
>
> What happens if there are future refs but they are in a sibling branch

#TODO

## Input

`````js filename=intro
function f() {
  let x = $(1);
  if ($) {
    x = $(2);
    $(x);
  }
  if ($) {
    $('if');
  } else {
    // This should prevent SSA
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
    x = $(2);
    $(x);
  }
  if ($) {
    $('if');
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
    x = $(2);
    $(x);
    const tmpReturnArg = tmpBranchingC();
    return tmpReturnArg;
  };
  const tmpBranchingB = function () {
    debugger;
    const tmpReturnArg$1 = tmpBranchingC();
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function () {
    debugger;
    if ($) {
      $('if');
      return undefined;
    } else {
      $(x);
      return undefined;
    }
  };
  if ($) {
    const tmpReturnArg$3 = tmpBranchingA();
    return tmpReturnArg$3;
  } else {
    const tmpReturnArg$5 = tmpBranchingB();
    return tmpReturnArg$5;
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
  let x = $(1);
  const tmpBranchingC = function () {
    debugger;
    if ($) {
      $('if');
      return undefined;
    } else {
      $(x);
      return undefined;
    }
  };
  if ($) {
    x = $(2);
    $(x);
    tmpBranchingC();
    return undefined;
  } else {
    tmpBranchingC();
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
 - 4: 'if'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
