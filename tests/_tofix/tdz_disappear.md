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
  $(`block`);
  $(`block`);
  const tmpBool /*:boolean*/ = Boolean(x);
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
  $(`block`);
  $(`block`);
  const tmpBool = Boolean(x);
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
  $( "block" );
  $( "block" );
  const b = Boolean( x );
  return b;
};
a();
const c = a();
$( c );
`````


## Todos triggered


None


## Globals


BAD@! Found 1 implicit global bindings:

x


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: BAD!!
 - 1: 'block'
 - 2: 'block'
 - eval returned: ('<crash[ <ref> is not defined ]>')

Denormalized calls: BAD!!
 - 1: 'block'
 - 2: 'block'
 - eval returned: ('<crash[ <ref> is not defined ]>')
