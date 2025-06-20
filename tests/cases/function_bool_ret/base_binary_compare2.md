# Preval test case

# base_binary_compare2.md

> Function bool ret > Base binary compare2
>
> A function that is guaranteed to return bools may be eligible for inverting

## Input

`````js filename=intro
function f() {
  if ($) {
    return 'a' === $; // Doesn't matter what $ is, the function will return true or false.
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
const f /*:()=>boolean*/ = function () {
  debugger;
  if ($) {
    const tmpReturnArg /*:boolean*/ = `a` === $;
    return tmpReturnArg;
  } else {
    return false;
  }
};
const tmpUnaryArg /*:boolean*/ = f();
const tmpCalleeParam /*:boolean*/ /*banged*/ = !tmpUnaryArg;
$(tmpCalleeParam, `one`);
const tmpUnaryArg$1 /*:boolean*/ = f();
const tmpCalleeParam$1 /*:boolean*/ /*banged*/ = !tmpUnaryArg$1;
$(tmpCalleeParam$1, `two`);
const tmpUnaryArg$3 /*:boolean*/ = f();
const tmpCalleeParam$3 /*:boolean*/ /*banged*/ = !tmpUnaryArg$3;
$(tmpCalleeParam$3, `three`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const f = function () {
  if ($) {
    const tmpReturnArg = `a` === $;
    return tmpReturnArg;
  } else {
    return false;
  }
};
const tmpUnaryArg = f();
$(!tmpUnaryArg, `one`);
const tmpUnaryArg$1 = f();
$(!tmpUnaryArg$1, `two`);
const tmpUnaryArg$3 = f();
$(!tmpUnaryArg$3, `three`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  debugger;
  if ($) {
    const b = "a" === $;
    return b;
  }
  else {
    return false;
  }
};
const c = a();
const d = !c;
$( d, "one" );
const e = a();
const f = !e;
$( f, "two" );
const g = a();
const h = !g;
$( h, "three" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  if ($) {
    const tmpReturnArg = `a` === $;
    return tmpReturnArg;
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


None


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
