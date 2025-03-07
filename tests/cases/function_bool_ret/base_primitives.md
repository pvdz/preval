# Preval test case

# base_primitives.md

> Function bool ret > Base primitives
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
$(!f(), 'one');
$(!f(), 'two');
$(!f(), 'three');
`````

## Settled


`````js filename=intro
const tmpUnaryArg /*:boolean*/ = Boolean($);
const tmpCalleeParam /*:boolean*/ = !tmpUnaryArg;
$(tmpCalleeParam, `one`);
const tmpUnaryArg$1 /*:boolean*/ = Boolean($);
const tmpCalleeParam$1 /*:boolean*/ = !tmpUnaryArg$1;
$(tmpCalleeParam$1, `two`);
const tmpUnaryArg$3 /*:boolean*/ = Boolean($);
const tmpCalleeParam$3 /*:boolean*/ = !tmpUnaryArg$3;
$(tmpCalleeParam$3, `three`);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpUnaryArg = Boolean($);
$(!tmpUnaryArg, `one`);
const tmpUnaryArg$1 = Boolean($);
$(!tmpUnaryArg$1, `two`);
const tmpUnaryArg$3 = Boolean($);
$(!tmpUnaryArg$3, `three`);
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  if ($) {
    return true;
  } else {
    return false;
  }
};
$(!f(), `one`);
$(!f(), `two`);
$(!f(), `three`);
`````

## Normalized


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
const tmpCalleeParam = !tmpUnaryArg;
$(tmpCalleeParam, `one`);
const tmpUnaryArg$1 = f();
const tmpCalleeParam$1 = !tmpUnaryArg$1;
$(tmpCalleeParam$1, `two`);
const tmpUnaryArg$3 = f();
const tmpCalleeParam$3 = !tmpUnaryArg$3;
$(tmpCalleeParam$3, `three`);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = Boolean( $ );
const b = !a;
$( b, "one" );
const c = Boolean( $ );
const d = !c;
$( d, "two" );
const e = Boolean( $ );
const f = !e;
$( f, "three" );
`````

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
