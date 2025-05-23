# Preval test case

# decl_recursive_second_attempt.md

> Ssa > Decl recursive second attempt
>
> A recursive function that is then replaced with another value (why would you do this, I dunno)

## Input

`````js filename=intro
const T = $(true);
const F = $(false);
function f() {
  let g = function (x) {
    if (x) {
      g(F);
      return $(100);
    }
  };
  // The idea is that if `g` above is SSA'd then the name would change. But if the name changes then
  // the reference is no longer accessible.
  g = g(T);
  $(g);
}
if ($) f();
`````


## Settled


`````js filename=intro
const T /*:unknown*/ = $(true);
const F /*:unknown*/ = $(false);
if ($) {
  let g /*:(unknown)=>unknown*/ = function ($$0) {
    const x /*:unknown*/ = $$0;
    debugger;
    if (x) {
      g(F);
      const tmpReturnArg /*:unknown*/ = $(100);
      return tmpReturnArg;
    } else {
      return undefined;
    }
  };
  g = g(T);
  $(g);
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const T = $(true);
const F = $(false);
if ($) {
  let g = function (x) {
    if (x) {
      g(F);
      const tmpReturnArg = $(100);
      return tmpReturnArg;
    }
  };
  g = g(T);
  $(g);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( true );
const b = $( false );
if ($) {
  let c = function($$0 ) {
    const d = $$0;
    debugger;
    if (d) {
      c( b );
      const e = $( 100 );
      return e;
    }
    else {
      return undefined;
    }
  };
  c = c( a );
  $( c );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  let g = function ($$0) {
    let x = $$0;
    debugger;
    if (x) {
      g(F);
      const tmpReturnArg = $(100);
      return tmpReturnArg;
    } else {
      return undefined;
    }
  };
  g = g(T);
  $(g);
  return undefined;
};
const T = $(true);
const F = $(false);
if ($) {
  f();
} else {
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: true
 - 2: false
 - 3: 100
 - 4: 100
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
