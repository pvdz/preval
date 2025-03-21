# Preval test case

# argslen.md

> Static arg ops > Coerce > Assign > Closure > Argslen

## Input

`````js filename=intro
let x = $('50');
const f = function (c) {
  x = $coerce(arguments.length, 'number');
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
$(1);
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
$(1);
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
$( 1 );
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
 - 8: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
