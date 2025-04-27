# Preval test case

# closure.md

> Static arg ops > Coerce > Assign > Closure > Closure

## Input

`````js filename=intro
let x = $('50');
let y = undefined;
const f = function (c) {
  y = $coerce(x, 'number');
  $(1);
  $(2);
  $(c);
};
f(3);
f(4);
$(x);
$(y);
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
$coerce(x, `number`);
f(3);
const y /*:number*/ = $coerce(x, `number`);
f(4);
$(x);
$(y);
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
$coerce(x, `number`);
f(3);
const y = $coerce(x, `number`);
f(4);
$(x);
$(y);
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
$coerce( a, "number" );
b( 3 );
const d = $coerce( a, "number" );
b( 4 );
$( a );
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
 - 8: '50'
 - 9: 50
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
