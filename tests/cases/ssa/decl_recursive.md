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
if ($) {
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
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($) {
  let g = function (x) {
    if (x) {
      g($(false));
      const tmpReturnArg = $(100);
      return tmpReturnArg;
    }
  };
  g = g($(true));
}
`````


## PST Settled
With rename=true

`````js filename=intro
if ($) {
  let a = function($$0 ) {
    const b = $$0;
    debugger;
    if (b) {
      const c = $( false );
      a( c );
      const d = $( 100 );
      return d;
    }
    else {
      return undefined;
    }
  };
  const e = $( true );
  a = a( e );
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
