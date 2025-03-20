# Preval test case

# param3.md

> Static arg ops > Coerce > Assign > Closure > Param3

## Input

`````js filename=intro
let x = $({
  valueOf:function(){ $('PASS'); }
});
Number(x);                    // This should trigger a pass
const f = function (c) {
  x = $coerce(c, 'number');   // This should trigger a pass if c===x. But c will never be x here.
  $(1);
  $(2);
  $(c);
};
f(3);
f(4);
f(x);                         // At this point, x is set to 3, the first call to f() above, so no PASS output
`````


## Settled


`````js filename=intro
const tmpObjLitVal /*:()=>undefined*/ = function () {
  debugger;
  $(`PASS`);
  return undefined;
};
const tmpCalleeParam /*:object*/ = { valueOf: tmpObjLitVal };
let x /*:unknown*/ = $(tmpCalleeParam);
$coerce(x, `number`);
const f /*:(unknown)=>undefined*/ = function ($$0) {
  const c /*:unknown*/ = $$0;
  debugger;
  x = $coerce(c, `number`);
  $(1);
  $(2);
  $(c);
  return undefined;
};
f(3);
f(4);
f(x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpObjLitVal = function () {
  $(`PASS`);
};
let x = $({ valueOf: tmpObjLitVal });
$coerce(x, `number`);
const f = function (c) {
  x = $coerce(c, `number`);
  $(1);
  $(2);
  $(c);
};
f(3);
f(4);
f(x);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  debugger;
  $( "PASS" );
  return undefined;
};
const b = { valueOf: a };
let c = $( b );
$coerce( c, "number" );
const d = function($$0 ) {
  const e = $$0;
  debugger;
  c = $coerce( e, "number" );
  $( 1 );
  $( 2 );
  $( e );
  return undefined;
};
d( 3 );
d( 4 );
d( c );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { valueOf: '"<function>"' }
 - 2: 'PASS'
 - 3: 1
 - 4: 2
 - 5: 3
 - 6: 1
 - 7: 2
 - 8: 4
 - 9: 1
 - 10: 2
 - 11: 4
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
