# Preval test case

# base_binary_compare3.md

> Function bool ret > Base binary compare3
>
> A function that is guaranteed to return bools may be eligible for inverting

## Input

`````js filename=intro
function f() {
  if ($) {
    return $ === $; // Doesn't matter what $ is, the function will return true or false.
  } else {
    return false;
  }
}
// These inverts can be dropped by inverting all return values of `f`
$(!f(), 'one');
$(!f(), 'two');
$(!f(), 'three');
`````


## Settled


`````js filename=intro
const tmpUnaryArg /*:boolean*/ = $boolean_constructor($);
const tmpCalleeParam /*:boolean*/ = !tmpUnaryArg;
$(tmpCalleeParam, `one`);
const tmpUnaryArg$1 /*:boolean*/ = $boolean_constructor($);
const tmpCalleeParam$1 /*:boolean*/ = !tmpUnaryArg$1;
$(tmpCalleeParam$1, `two`);
const tmpUnaryArg$3 /*:boolean*/ = $boolean_constructor($);
const tmpCalleeParam$3 /*:boolean*/ = !tmpUnaryArg$3;
$(tmpCalleeParam$3, `three`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpUnaryArg = $boolean_constructor($);
$(!tmpUnaryArg, `one`);
const tmpUnaryArg$1 = $boolean_constructor($);
$(!tmpUnaryArg$1, `two`);
const tmpUnaryArg$3 = $boolean_constructor($);
$(!tmpUnaryArg$3, `three`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $boolean_constructor( $ );
const b = !a;
$( b, "one" );
const c = $boolean_constructor( $ );
const d = !c;
$( d, "two" );
const e = $boolean_constructor( $ );
const f = !e;
$( f, "three" );
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
const tmpUnaryArg = f();
let tmpCalleeParam = !tmpUnaryArg;
$(tmpCalleeParam, `one`);
const tmpUnaryArg$1 = f();
let tmpCalleeParam$1 = !tmpUnaryArg$1;
$(tmpCalleeParam$1, `two`);
const tmpUnaryArg$3 = f();
let tmpCalleeParam$3 = !tmpUnaryArg$3;
$(tmpCalleeParam$3, `three`);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $boolean_constructor


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: false, 'one'
 - 2: false, 'two'
 - 3: false, 'three'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
