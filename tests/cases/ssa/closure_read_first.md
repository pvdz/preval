# Preval test case

# closure_read_first.md

> Ssa > Closure read first
>
> Cannot SSA because a call to g() should affect the next call to g()

## Input

`````js filename=intro
function f() {
  let x = 1;
  let g = function() {
    $(x);
    if ($) {
      x = $(x + 1);
      $(x);
    }
  }
  g();
  g();
  $();
}
if ($) $(f());
`````

## Settled


`````js filename=intro
const f /*:()=>undefined*/ = function () {
  debugger;
  let x /*:unknown*/ = 1;
  const g /*:()=>undefined*/ = function () {
    debugger;
    $(x);
    if ($) {
      const tmpCalleeParam /*:number*/ = x + 1;
      x = $(tmpCalleeParam);
      $(x);
      return undefined;
    } else {
      return undefined;
    }
  };
  g();
  g();
  $();
  return undefined;
};
if ($) {
  f();
  $(undefined);
} else {
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const f = function () {
  let x = 1;
  const g = function () {
    $(x);
    if ($) {
      x = $(x + 1);
      $(x);
    }
  };
  g();
  g();
  $();
};
if ($) {
  f();
  $(undefined);
}
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  let x = 1;
  let g = function () {
    debugger;
    $(x);
    if ($) {
      x = $(x + 1);
      $(x);
    }
  };
  g();
  g();
  $();
};
if ($) $(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  let x = 1;
  let g = function () {
    debugger;
    $(x);
    if ($) {
      const tmpCalleeParam = x + 1;
      x = $(tmpCalleeParam);
      $(x);
      return undefined;
    } else {
      return undefined;
    }
  };
  g();
  g();
  $();
  return undefined;
};
if ($) {
  const tmpCalleeParam$1 = f();
  $(tmpCalleeParam$1);
} else {
}
`````

## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  debugger;
  let b = 1;
  const c = function() {
    debugger;
    $( b );
    if ($) {
      const d = b + 1;
      b = $( d );
      $( b );
      return undefined;
    }
    else {
      return undefined;
    }
  };
  c();
  c();
  $();
  return undefined;
};
if ($) {
  a();
  $( undefined );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 2
 - 4: 2
 - 5: 3
 - 6: 3
 - 7: 
 - 8: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
