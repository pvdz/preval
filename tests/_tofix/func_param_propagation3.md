# Preval test case

# func_param_propagation3.md

> Tofix > func param propagation3
>
> If we can resolve that `===` at call time and pass in a boolean for it ... then we can eliminate this whole function

## Input

`````js filename=intro
const f = function ($$0) {
  const $dlr_$$0 = $$0;
  debugger;
  const tmpIfTest$1 = $dlr_$$0 === undefined;
  if (tmpIfTest$1) {
    const c = [`x`, `bar`];
    return c;
  } else {
    const d = [`x`, $dlr_$$0];
    return d;
  }
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
const tmpCalleeParam$1 = f(`y`);
$(tmpCalleeParam$1);
`````


## Settled


`````js filename=intro
const f /*:(primitive)=>array*/ = function ($$0) {
  const $dlr_$$1 /*:primitive*/ = $$0;
  debugger;
  const tmpIfTest$1 /*:boolean*/ = $dlr_$$1 === undefined;
  if (tmpIfTest$1) {
    const c /*:array*/ = [`x`, `bar`];
    return c;
  } else {
    const d /*:array*/ = [`x`, $dlr_$$1];
    return d;
  }
};
const tmpCalleeParam /*:array*/ = f();
$(tmpCalleeParam);
const tmpCalleeParam$1 /*:array*/ = f(`y`);
$(tmpCalleeParam$1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const f = function ($dlr_$$1) {
  if ($dlr_$$1 === undefined) {
    const c = [`x`, `bar`];
    return c;
  } else {
    const d = [`x`, $dlr_$$1];
    return d;
  }
};
$(f());
$(f(`y`));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function($$0 ) {
  const b = $$0;
  debugger;
  const c = b === undefined;
  if (c) {
    const d = [ "x", "bar" ];
    return d;
  }
  else {
    const e = [ "x", b ];
    return e;
  }
};
const f = a();
$( f );
const g = a( "y" );
$( g );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: ['x', 'bar']
 - 2: ['x', 'y']
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
