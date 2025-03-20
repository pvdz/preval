# Preval test case

# base_primitives_double_bang.md

> Function bool ret > Base primitives double bang
>
> A function that is guaranteed to return bools may be eligible for inverting

## Input

`````js filename=intro
function f() {
  if ($) {
    return true;
  } else {
    return false;
  }
}
// These inverts can be dropped by inverting all return values of f
$(!!f(), 'one');
$(!!f(), 'two');
$(!!f(), 'three');
`````


## Settled


`````js filename=intro
const tmpUnaryArg$1 /*:boolean*/ = Boolean($);
$(tmpUnaryArg$1, `one`);
const tmpUnaryArg$5 /*:boolean*/ = Boolean($);
$(tmpUnaryArg$5, `two`);
const tmpUnaryArg$9 /*:boolean*/ = Boolean($);
$(tmpUnaryArg$9, `three`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(Boolean($), `one`);
$(Boolean($), `two`);
$(Boolean($), `three`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = Boolean( $ );
$( a, "one" );
const b = Boolean( $ );
$( b, "two" );
const c = Boolean( $ );
$( c, "three" );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: true, 'one'
 - 2: true, 'two'
 - 3: true, 'three'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
