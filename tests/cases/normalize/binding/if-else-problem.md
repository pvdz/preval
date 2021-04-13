# Preval test case

# if-else-problem.md

> Normalize > Binding > If-else-problem
>
> Sketching out a problem

#TODO

## Input

`````js filename=intro
function f1() {
  let x = undefined;
  let g = function() {
    // Can SSA because all reads in this function happen after an unconditional assign
    x = function(){};
    $(x);
  }
}
if ($) $(f1());

function f2() {
  let x = undefined;
  let g = function() {
    $(x); // Cannot SSA because a call to g() should affect the next call to g()
    x = function(){};
    $(x);
  }
}
if ($) $(f2());

function f3() {
  let x = 0;
  let g = function(t) {
    if (t) {
      // Cannot SSA because f(true) f(false) should have the same value for x
      x = x + 1;
    }
    $(x);
  }
}
if ($) $(f3());

function f4() {
  let x = undefined;
  let g = function() {
    // Can not SSA because there is a read inside an inner function that should reflect
    // the state of x after the _last_ call to g(), even after any call of g() finishes
    x = function(){};
    return function() { $(x); }
  }
}
if ($) $(f4());

function f5() {
  let x = undefined;
  let g = function() {
    // Can SSA because while x is closed in h, we can determine that h does not "escape"
    // and so there's no need to preserve access to x after g completes.
    x = function(){};
    let h = function() { $(x); }
    return h();
  }
}
if ($) $(f5());
`````

## Pre Normal

`````js filename=intro
let f1 = function () {
  debugger;
  let x = undefined;
  let g = function () {
    debugger;
    x = function () {
      debugger;
    };
    $(x);
  };
};
let f2 = function () {
  debugger;
  let x$1 = undefined;
  let g$1 = function () {
    debugger;
    $(x$1);
    x$1 = function () {
      debugger;
    };
    $(x$1);
  };
};
let f3 = function () {
  debugger;
  let x$3 = 0;
  let g$3 = function ($$0) {
    let t = $$0;
    debugger;
    if (t) {
      x$3 = x$3 + 1;
    }
    $(x$3);
  };
};
let f4 = function () {
  debugger;
  let x$5 = undefined;
  let g$5 = function () {
    debugger;
    x$5 = function () {
      debugger;
    };
    return function () {
      debugger;
      $(x$5);
    };
  };
};
let f5 = function () {
  debugger;
  let x$7 = undefined;
  let g$7 = function () {
    debugger;
    x$7 = function () {
      debugger;
    };
    let h = function () {
      debugger;
      $(x$7);
    };
    return h();
  };
};
if ($) $(f1());
if ($) $(f2());
if ($) $(f3());
if ($) $(f4());
if ($) $(f5());
`````

## Normalized

`````js filename=intro
let f1 = function () {
  debugger;
  let x = undefined;
  let g = function () {
    debugger;
    x = function () {
      debugger;
      return undefined;
    };
    $(x);
    return undefined;
  };
  return undefined;
};
let f2 = function () {
  debugger;
  let x$1 = undefined;
  let g$1 = function () {
    debugger;
    $(x$1);
    x$1 = function () {
      debugger;
      return undefined;
    };
    $(x$1);
    return undefined;
  };
  return undefined;
};
let f3 = function () {
  debugger;
  let x$3 = 0;
  let g$3 = function ($$0) {
    let t = $$0;
    debugger;
    const tmpBranchingA = function () {
      debugger;
      x$3 = x$3 + 1;
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
      $(x$3);
      return undefined;
    };
    if (t) {
      const tmpReturnArg$3 = tmpBranchingA();
      return tmpReturnArg$3;
    } else {
      const tmpReturnArg$5 = tmpBranchingB();
      return tmpReturnArg$5;
    }
  };
  return undefined;
};
let f4 = function () {
  debugger;
  let x$5 = undefined;
  let g$5 = function () {
    debugger;
    x$5 = function () {
      debugger;
      return undefined;
    };
    const tmpReturnArg$7 = function () {
      debugger;
      $(x$5);
      return undefined;
    };
    return tmpReturnArg$7;
  };
  return undefined;
};
let f5 = function () {
  debugger;
  let x$7 = undefined;
  let g$7 = function () {
    debugger;
    x$7 = function () {
      debugger;
      return undefined;
    };
    let h = function () {
      debugger;
      $(x$7);
      return undefined;
    };
    const tmpReturnArg$9 = h();
    return tmpReturnArg$9;
  };
  return undefined;
};
if ($) {
  const tmpCallCallee = $;
  const tmpCalleeParam = f1();
  tmpCallCallee(tmpCalleeParam);
  if ($) {
    const tmpCallCallee$1 = $;
    const tmpCalleeParam$1 = f2();
    tmpCallCallee$1(tmpCalleeParam$1);
    if ($) {
      const tmpCallCallee$3 = $;
      const tmpCalleeParam$3 = f3();
      tmpCallCallee$3(tmpCalleeParam$3);
      if ($) {
        const tmpCallCallee$5 = $;
        const tmpCalleeParam$5 = f4();
        tmpCallCallee$5(tmpCalleeParam$5);
        if ($) {
          const tmpCallCallee$7 = $;
          const tmpCalleeParam$7 = f5();
          tmpCallCallee$7(tmpCalleeParam$7);
        } else {
        }
      } else {
      }
    } else {
    }
  } else {
  }
} else {
}
`````

## Output

`````js filename=intro
if ($) {
  $(undefined);
  if ($) {
    $(undefined);
    if ($) {
      $(undefined);
      if ($) {
        $(undefined);
        if ($) {
          $(undefined);
        } else {
        }
      } else {
      }
    } else {
    }
  } else {
  }
} else {
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: undefined
 - 2: undefined
 - 3: undefined
 - 4: undefined
 - 5: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
