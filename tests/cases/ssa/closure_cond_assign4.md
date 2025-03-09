# Preval test case

# closure_cond_assign4.md

> Ssa > Closure cond assign4
>
> Outline of the `if` test

## Input

`````js filename=intro
function f() {
  let x = 0;
  let g = function(t) {
    if (t) {
      x = x + 1;
      $(x);
    }
  }
  if ($) {
    g(true);
    g(false);
    g(true);
    g(false);
    g(false);
    g(true);
    g(true);
  }
}
if ($) $(f());
`````

## Settled


`````js filename=intro
if ($) {
  let x /*:number*/ = 0;
  const g_t /*:()=>unknown*/ = function () {
    debugger;
    x = x + 1;
    $(x);
    return undefined;
  };
  g_t();
  if ($) {
    g_t();
    g_t();
    g_t();
    $(undefined);
  } else {
  }
} else {
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($) {
  let x = 0;
  const g_t = function () {
    x = x + 1;
    $(x);
  };
  g_t();
  if ($) {
    g_t();
    g_t();
    g_t();
    $(undefined);
  }
}
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  let x = 0;
  let g = function ($$0) {
    let t = $$0;
    debugger;
    if (t) {
      x = x + 1;
      $(x);
    }
  };
  if ($) {
    g(true);
    g(false);
    g(true);
    g(false);
    g(false);
    g(true);
    g(true);
  }
};
if ($) $(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  let x = 0;
  let g = function ($$0) {
    let t = $$0;
    debugger;
    if (t) {
      x = x + 1;
      $(x);
      return undefined;
    } else {
      return undefined;
    }
  };
  if ($) {
    g(true);
    g(false);
    g(true);
    g(false);
    g(false);
    g(true);
    g(true);
    return undefined;
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

## PST Settled
With rename=true

`````js filename=intro
if ($) {
  let a = 0;
  const b = function() {
    debugger;
    a = a + 1;
    $( a );
    return undefined;
  };
  b();
  if ($) {
    b();
    b();
    b();
    $( undefined );
  }
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 3
 - 4: 4
 - 5: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
