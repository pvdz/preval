# Preval test case

# back2back_x_x_plus_1_assign4.md

> Ssa > Back2back x x plus 1 assign4
>
> This may be an artifact through using ++x

We may not be able to properly deal with the temporal order but we can certainly know that the back2back write to x can be SSA'd.

We do have to be careful about using x in the rhs.

Zooming in on the `x = x + 1` case. This is the double assign case.

This should be the proof of why this is dangerous. The `x + 1` expression could have observable side effects that change x.

What happens if we do SSA it?

#TODO

## Input

`````js filename=intro
const f = function () {
  if ($) {
    const g = function () {
      if ($) {
        $(x);
        return undefined;
      } else {
        return undefined;
      }
    };
    let x = $(5);
    $(x);
    const t = function() {
      // This closure will stop working if you rename the x below...
      if ($) $(x, 't');
    };
    // This rhs is _only_ observed as part of the next update to x, so we should be able to SSA this
    x = $({ // What if we rename this assign and all writes up to the next one? x->ssax
      toString(){
        x = 200;
        t();
        $(x);
        if ($) $(11);
        return 'hi';
      }
    });
    // This read goes before the assign in rwOrder, and we don't change the assign
    x = x + 1;
    g();
    t();
    if ($) $(10);
    return undefined;
  } else {
    return undefined;
  }
};
if ($) {
  f();
} else {
}
`````

## Pre Normal

`````js filename=intro
const f = function () {
  debugger;
  if ($) {
    const g = function () {
      debugger;
      if ($) {
        $(x);
        return undefined;
      } else {
        return undefined;
      }
    };
    let x = $(5);
    $(x);
    const t = function () {
      debugger;
      if ($) $(x, 't');
    };
    x = $({
      toString() {
        debugger;
        x = 200;
        t();
        $(x);
        if ($) $(11);
        return 'hi';
      },
    });
    x = x + 1;
    g();
    t();
    if ($) $(10);
    return undefined;
  } else {
    return undefined;
  }
};
if ($) {
  f();
} else {
}
`````

## Normalized

`````js filename=intro
const f = function () {
  debugger;
  const tmpBranchingA$1 = function () {
    debugger;
    const g$1 = function () {
      debugger;
      if ($) {
        $(x$1);
        return undefined;
      } else {
        return undefined;
      }
    };
    let x$1 = $(5);
    $(x$1);
    const t$1 = function () {
      debugger;
      if ($) {
        $(x$1, 't');
        return undefined;
      } else {
        return undefined;
      }
    };
    const tmpCallCallee$1 = $;
    const tmpCalleeParam$1 = {
      toString() {
        debugger;
        x$1 = 200;
        t$1();
        $(x$1);
        const tmpBranchingA$3 = function () {
          debugger;
          $(11);
          const tmpReturnArg$7 = tmpBranchingC$3();
          return tmpReturnArg$7;
        };
        const tmpBranchingB$3 = function () {
          debugger;
          const tmpReturnArg$9 = tmpBranchingC$3();
          return tmpReturnArg$9;
        };
        const tmpBranchingC$3 = function () {
          debugger;
          return 'hi';
        };
        if ($) {
          const tmpReturnArg$11 = tmpBranchingA$3();
          return tmpReturnArg$11;
        } else {
          const tmpReturnArg$13 = tmpBranchingB$3();
          return tmpReturnArg$13;
        }
      },
    };
    x$1 = tmpCallCallee$1(tmpCalleeParam$1);
    x$1 = x$1 + 1;
    g$1();
    t$1();
    const tmpBranchingA$5 = function () {
      debugger;
      $(10);
      return undefined;
    };
    const tmpBranchingB$5 = function () {
      debugger;
      return undefined;
    };
    const tmpBranchingC$5 = function () {
      debugger;
      const tmpReturnArg$15 = tmpBranchingC$1();
      return tmpReturnArg$15;
    };
    if ($) {
      const tmpReturnArg$17 = tmpBranchingA$5();
      return tmpReturnArg$17;
    } else {
      const tmpReturnArg$19 = tmpBranchingB$5();
      return tmpReturnArg$19;
    }
  };
  const tmpBranchingB$1 = function () {
    debugger;
    return undefined;
  };
  const tmpBranchingC$1 = function () {
    debugger;
    return undefined;
  };
  if ($) {
    const tmpReturnArg$21 = tmpBranchingA$1();
    return tmpReturnArg$21;
  } else {
    const tmpReturnArg$23 = tmpBranchingB$1();
    return tmpReturnArg$23;
  }
};
if ($) {
  f();
} else {
}
`````

## Output

`````js filename=intro
const tmpBranchingA$1 = function () {
  debugger;
  const g$1 = function () {
    debugger;
    if ($) {
      $(x$1);
      return undefined;
    } else {
      return undefined;
    }
  };
  let x$1 = $(5);
  $(x$1);
  const t$1 = function () {
    debugger;
    if ($) {
      $(x$1, 't');
      return undefined;
    } else {
      return undefined;
    }
  };
  const tmpCalleeParam$1 = {
    toString() {
      debugger;
      x$1 = 200;
      t$1();
      $(x$1);
      if ($) {
        $(11);
        return 'hi';
      } else {
        return 'hi';
      }
    },
  };
  x$1 = $(tmpCalleeParam$1);
  x$1 = x$1 + 1;
  g$1();
  t$1();
  if ($) {
    $(10);
    return undefined;
  } else {
    return undefined;
  }
};
if ($) {
  tmpBranchingA$1();
} else {
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 5
 - 2: 5
 - 3: { toString: '"<function>"' }
 - 4: 200, 't'
 - 5: 200
 - 6: 11
 - 7: 'hi1'
 - 8: 'hi1', 't'
 - 9: 10
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
