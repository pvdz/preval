# Preval test case

# base.md

> Static arg ops > Coerce > Assign > Closure > Base

## Input

`````js filename=intro
let x = $('50');
const f = function (c) {
  x = $coerce(x, 'number');
  $(1);
  $(2);
  $(c);
};
f(3);
f(4);
$(x);
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(`50`);
const f /*:(number)=>undefined*/ = function ($$0) {
  const c /*:number*/ = $$0;
  debugger;
  $(1);
  $(2);
  $(c);
  return undefined;
};
const tmpClusterSSA_x /*:number*/ = $coerce(x, `number`);
f(3);
f(4);
$(tmpClusterSSA_x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $(`50`);
const f = function (c) {
  $(1);
  $(2);
  $(c);
};
const tmpClusterSSA_x = $coerce(x, `number`);
f(3);
f(4);
$(tmpClusterSSA_x);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "50" );
const b = function($$0 ) {
  const c = $$0;
  debugger;
  $( 1 );
  $( 2 );
  $( c );
  return undefined;
};
const d = $coerce( a, "number" );
b( 3 );
b( 4 );
$( d );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '50'
 - 2: 1
 - 3: 2
 - 4: 3
 - 5: 1
 - 6: 2
 - 7: 4
 - 8: 50
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
