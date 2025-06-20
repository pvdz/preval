# Preval test case

# inner_return_lit.md

> If call if > Inner return lit
>
> The inner returning a literal should be inlinable

## Input

`````js filename=intro
function f() {
  function g() {
    if (x) {
      return 500;
    } else {
      return 1000;
    }
  }
  let x = $(1);
  if (x) {
    x = true;
    return g();
  } else {
    x = $(0);
    return g();
  }
}
if ($) $(f());
`````


## Settled


`````js filename=intro
if ($) {
  const x /*:unknown*/ = $(1);
  if (x) {
    $(500);
  } else {
    const tmpClusterSSA_x /*:unknown*/ = $(0);
    if (tmpClusterSSA_x) {
      $(500);
    } else {
      $(1000);
    }
  }
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($) {
  if ($(1)) {
    $(500);
  } else {
    if ($(0)) {
      $(500);
    } else {
      $(1000);
    }
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
if ($) {
  const a = $( 1 );
  if (a) {
    $( 500 );
  }
  else {
    const b = $( 0 );
    if (b) {
      $( 500 );
    }
    else {
      $( 1000 );
    }
  }
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  let g = function () {
    debugger;
    if (x) {
      return 500;
    } else {
      return 1000;
    }
  };
  let x = $(1);
  if (x) {
    x = true;
    const tmpReturnArg = g();
    return tmpReturnArg;
  } else {
    x = $(0);
    const tmpReturnArg$1 = g();
    return tmpReturnArg$1;
  }
};
if ($) {
  let tmpCalleeParam = f();
  $(tmpCalleeParam);
} else {
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 500
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
