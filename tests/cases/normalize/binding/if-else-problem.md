# Preval test case

# if-else-problem.md

> Normalize > Binding > If-else-problem
>
> Sketching out a problem

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


## Settled


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


## Denormalized
(This ought to be the final result)

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
        }
      }
    }
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
if ($) {
  $( undefined );
  if ($) {
    $( undefined );
    if ($) {
      $( undefined );
      if ($) {
        $( undefined );
        if ($) {
          $( undefined );
        }
      }
    }
  }
}
`````


## Normalized
(This is what phase1 received the first time)

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
    if (t) {
      x$3 = x$3 + 1;
      $(x$3);
      return undefined;
    } else {
      $(x$3);
      return undefined;
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
    const tmpReturnArg = function () {
      debugger;
      $(x$5);
      return undefined;
    };
    return tmpReturnArg;
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
    const tmpReturnArg$1 = h();
    return tmpReturnArg$1;
  };
  return undefined;
};
if ($) {
  let tmpCalleeParam = f1();
  $(tmpCalleeParam);
  if ($) {
    let tmpCalleeParam$1 = f2();
    $(tmpCalleeParam$1);
    if ($) {
      let tmpCalleeParam$3 = f3();
      $(tmpCalleeParam$3);
      if ($) {
        let tmpCalleeParam$5 = f4();
        $(tmpCalleeParam$5);
        if ($) {
          let tmpCalleeParam$7 = f5();
          $(tmpCalleeParam$7);
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


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: undefined
 - 2: undefined
 - 3: undefined
 - 4: undefined
 - 5: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
