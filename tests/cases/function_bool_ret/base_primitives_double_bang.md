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
const tmpUnaryArg$1 /*:boolean*/ = $boolean_constructor($);
$(tmpUnaryArg$1, `one`);
const tmpUnaryArg$5 /*:boolean*/ = $boolean_constructor($);
$(tmpUnaryArg$5, `two`);
const tmpUnaryArg$9 /*:boolean*/ = $boolean_constructor($);
$(tmpUnaryArg$9, `three`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($boolean_constructor($), `one`);
$($boolean_constructor($), `two`);
$($boolean_constructor($), `three`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $boolean_constructor( $ );
$( a, "one" );
const b = $boolean_constructor( $ );
$( b, "two" );
const c = $boolean_constructor( $ );
$( c, "three" );
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $boolean_constructor


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
