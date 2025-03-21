# Preval test case

# partial_implicit.md

> Return > Partial implicit
>
> After normalization the implicit return will be explicit as well.

We won't be able to inline it.

## Input

`````js filename=intro
function f() {
  if ($) {
    $(100);
    return 10;
  }
}
$(f());
$(f());
$(f());
`````


## Settled


`````js filename=intro
const f /*:()=>primitive*/ = function () {
  debugger;
  if ($) {
    $(100);
    return 10;
  } else {
    return undefined;
  }
};
const tmpCalleeParam /*:primitive*/ = f();
$(tmpCalleeParam);
const tmpCalleeParam$1 /*:primitive*/ = f();
$(tmpCalleeParam$1);
const tmpCalleeParam$3 /*:primitive*/ = f();
$(tmpCalleeParam$3);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const f = function () {
  if ($) {
    $(100);
    return 10;
  }
};
$(f());
$(f());
$(f());
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  debugger;
  if ($) {
    $( 100 );
    return 10;
  }
  else {
    return undefined;
  }
};
const b = a();
$( b );
const c = a();
$( c );
const d = a();
$( d );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: 10
 - 3: 100
 - 4: 10
 - 5: 100
 - 6: 10
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
