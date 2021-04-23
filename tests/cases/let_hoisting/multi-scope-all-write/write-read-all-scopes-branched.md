# Preval test case

# write-read-all-scopes-branched.md

> Let hoisting > Multi-scope-all-write > Write-read-all-scopes-branched
>
> What if the first ref of a scope has a write but not all reads in that scope can reach it?

#TODO

## Input

`````js filename=intro
let x = 1;
const f = function() {
  if ($) {
    x = 2;
    if ($) {
      $(x);
    }
  }
  $(x);
}
if ($) {
  f();
  $(x);
}
`````

## Pre Normal

`````js filename=intro
let x = 1;
const f = function () {
  debugger;
  if ($) {
    x = 2;
    if ($) {
      $(x);
    }
  }
  $(x);
};
if ($) {
  f();
  $(x);
}
`````

## Normalized

`````js filename=intro
let x = 1;
const f = function () {
  debugger;
  const tmpBranchingA = function () {
    debugger;
    x = 2;
    const tmpBranchingA$1 = function () {
      debugger;
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
    const tmpReturnArg$9 = tmpBranchingC();
    return tmpReturnArg$9;
  };
  const tmpBranchingC = function () {
    debugger;
    $(x);
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
  $(x);
} else {
}
`````

## Output

`````js filename=intro
const tmpBranchingA = function () {
  debugger;
  x = 2;
  if ($) {
    $(2);
    tmpBranchingC();
    return undefined;
  } else {
    tmpBranchingC();
    return undefined;
  }
};
const tmpBranchingC = function () {
  debugger;
  $(x);
  return undefined;
};
let x = 1;
const f = function () {
  debugger;
  if ($) {
    tmpBranchingA();
    return undefined;
  } else {
    tmpBranchingC();
    return undefined;
  }
};
if ($) {
  f();
  $(x);
} else {
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2
 - 2: 2
 - 3: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
