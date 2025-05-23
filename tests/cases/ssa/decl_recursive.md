# Preval test case

# decl_recursive.md

> Ssa > Decl recursive
>
> A recursive function that is then replaced with another value (why would you do this, I dunno)

## Input

`````js filename=intro
function f() {
  let g = function (x) {
    if (x) {
      g($(false));
      return $(100);
    }
  };
  g = g($(true));
}
if ($) f();
`````


## Settled


`````js filename=intro
const f /*:()=>undefined*/ = function () {
  debugger;
  let g /*:(unknown)=>unknown*/ = function ($$0) {
    const x /*:unknown*/ = $$0;
    debugger;
    if (x) {
      const tmpCalleeParam /*:unknown*/ = $(false);
      g(tmpCalleeParam);
      const tmpReturnArg /*:unknown*/ = $(100);
      return tmpReturnArg;
    } else {
      return undefined;
    }
  };
  const tmpCalleeParam$1 /*:unknown*/ = $(true);
  g = g(tmpCalleeParam$1);
  return undefined;
};
if ($) {
  f();
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const f = function () {
  let g = function (x) {
    if (x) {
      g($(false));
      const tmpReturnArg = $(100);
      return tmpReturnArg;
    }
  };
  g = g($(true));
};
if ($) {
  f();
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  debugger;
  let b = function($$0 ) {
    const c = $$0;
    debugger;
    if (c) {
      const d = $( false );
      b( d );
      const e = $( 100 );
      return e;
    }
    else {
      return undefined;
    }
  };
  const f = $( true );
  b = b( f );
  return undefined;
};
if ($) {
  a();
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
      const tmpCallCallee = g;
      let tmpCalleeParam = $(false);
      g(tmpCalleeParam);
      const tmpReturnArg = $(100);
      return tmpReturnArg;
    } else {
      return undefined;
    }
  };
  const tmpCallCallee$1 = g;
  let tmpCalleeParam$1 = $(true);
  g = g(tmpCalleeParam$1);
  return undefined;
};
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
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
