# Preval test case

# param.md

> Static arg ops > Coerce > Const > Param

## Input

`````js filename=intro
let x = $('50');
const f = function (c) {
  const y = $coerce(c, 'number');
  $(1);
  $(2);
  $(y);
};
f(3);
f(4);
`````


## Settled


`````js filename=intro
$(`50`);
const f /*:(number)=>undefined*/ = function ($$0) {
  const c /*:number*/ = $$0;
  debugger;
  $(1);
  $(2);
  $(c);
  return undefined;
};
f(3);
f(4);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`50`);
const f = function (c) {
  $(1);
  $(2);
  $(c);
};
f(3);
f(4);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "50" );
const a = function($$0 ) {
  const b = $$0;
  debugger;
  $( 1 );
  $( 2 );
  $( b );
  return undefined;
};
a( 3 );
a( 4 );
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
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
