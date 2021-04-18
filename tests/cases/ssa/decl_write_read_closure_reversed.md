# Preval test case

# decl_write_read_closure_reversed.md

> Ssa > Decl write read closure reversed
>
> Trying to punch a hole into the existing algo because I think it's broken

#TODO

## Input

`````js filename=intro
function f() {
  if ($) { // Prevent normalization from inlining the func immediately
    let x = 5;
    const g = function(){
      if ($) x = 10;
    };
    g();
    if ($) x = 20;
    return x;
  }
}
if ($) $(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  if ($) {
    let x = 5;
    const g = function () {
      debugger;
      if ($) x = 10;
    };
    g();
    if ($) x = 20;
    return x;
  }
};
if ($) $(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  const tmpBranchingA = function () {
    debugger;
    let x$1 = 5;
    const g$1 = function () {
      debugger;
      if ($) {
        x$1 = 10;
        return undefined;
      } else {
        return undefined;
      }
    };
    g$1();
    const tmpBranchingA$1 = function () {
      debugger;
      x$1 = 20;
      return x$1;
    };
    const tmpBranchingB$1 = function () {
      debugger;
      return x$1;
    };
    const tmpBranchingC$1 = function () {
      debugger;
      const tmpReturnArg = tmpBranchingC();
      return tmpReturnArg;
    };
    if ($) {
      const tmpReturnArg$1 = tmpBranchingA$1();
      return tmpReturnArg$1;
    } else {
      const tmpReturnArg$3 = tmpBranchingB$1();
      return tmpReturnArg$3;
    }
  };
  const tmpBranchingB = function () {
    debugger;
    const tmpReturnArg$5 = tmpBranchingC();
    return tmpReturnArg$5;
  };
  const tmpBranchingC = function () {
    debugger;
    return undefined;
  };
  if ($) {
    const tmpReturnArg$7 = tmpBranchingA();
    return tmpReturnArg$7;
  } else {
    const tmpReturnArg$9 = tmpBranchingB();
    return tmpReturnArg$9;
  }
};
if ($) {
  const tmpCallCallee = $;
  const tmpCalleeParam = f();
  tmpCallCallee(tmpCalleeParam);
} else {
}
`````

## Output

`````js filename=intro
const tmpBranchingA = function () {
  debugger;
  let x$1 = 5;
  const g$1 = function () {
    debugger;
    if ($) {
      x$1 = 10;
      return undefined;
    } else {
      return undefined;
    }
  };
  g$1();
  if ($) {
    x$1 = 20;
    return x$1;
  } else {
    return x$1;
  }
};
const f = function () {
  debugger;
  if ($) {
    const tmpReturnArg$7 = tmpBranchingA();
    return tmpReturnArg$7;
  } else {
    return undefined;
  }
};
if ($) {
  const tmpCalleeParam = f();
  $(tmpCalleeParam);
} else {
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 20
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
