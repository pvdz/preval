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
const tmpCalleeParam /*:boolean*/ = $boolean_constructor($);
$(tmpCalleeParam, `one`);
const tmpCalleeParam$1 /*:boolean*/ = $boolean_constructor($);
$(tmpCalleeParam$1, `two`);
const tmpCalleeParam$3 /*:boolean*/ = $boolean_constructor($);
$(tmpCalleeParam$3, `three`);
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


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  if ($) {
    return true;
  } else {
    return false;
  }
};
const tmpUnaryArg$1 = f();
const tmpUnaryArg = !tmpUnaryArg$1;
let tmpCalleeParam = !tmpUnaryArg;
$(tmpCalleeParam, `one`);
const tmpUnaryArg$5 = f();
const tmpUnaryArg$3 = !tmpUnaryArg$5;
let tmpCalleeParam$1 = !tmpUnaryArg$3;
$(tmpCalleeParam$1, `two`);
const tmpUnaryArg$9 = f();
const tmpUnaryArg$7 = !tmpUnaryArg$9;
let tmpCalleeParam$3 = !tmpUnaryArg$7;
$(tmpCalleeParam$3, `three`);
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
