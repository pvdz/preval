# Preval test case

# tdz_disappear.md

> Tofix > tdz disappear

The `if (x)` check is moved such that the TDZ error triggers later

## Input

`````js filename=intro
function f() {
  let y = undefined;
  if (x) {
    y = true;
  } else {
    y = false;
  }
  $('block'); // Prevent the assignments from getting inlined
  $('block');
  return y;
}
f();
$(f());
`````


## Settled


`````js filename=intro
const f /*:()=>boolean*/ = function () {
  debugger;
  x;
  $(`block`);
  $(`block`);
  const tmpBool /*:boolean*/ = $boolean_constructor(x);
  return tmpBool;
};
f();
const tmpCalleeParam /*:boolean*/ = f();
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const f = function () {
  x;
  $(`block`);
  $(`block`);
  const tmpBool = $boolean_constructor(x);
  return tmpBool;
};
f();
$(f());
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  debugger;
  x;
  $( "block" );
  $( "block" );
  const b = $boolean_constructor( x );
  return b;
};
a();
const c = a();
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  let y = undefined;
  if (x) {
    y = true;
    $(`block`);
    $(`block`);
    return y;
  } else {
    y = false;
    $(`block`);
    $(`block`);
    return y;
  }
};
f();
let tmpCalleeParam = f();
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $boolean_constructor


## Globals


BAD@! Found 1 implicit global bindings:

x


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
