# Preval test case

# this.md

> Static arg ops > Coerce > Const > This

## Input

`````js filename=intro
let x = $('50');
const f = function (c) {
  const y = $coerce(this, 'number');
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
const f /*:()=>unknown*/ = function () {
  debugger;
  $(1);
  $(2);
  $($Number_NaN);
  return undefined;
};
f();
f();
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`50`);
const f = function () {
  $(1);
  $(2);
  $($Number_NaN);
};
f();
f();
`````


## PST Settled
With rename=true

`````js filename=intro
$( "50" );
const a = function() {
  debugger;
  $( 1 );
  $( 2 );
  $( $Number_NaN );
  return undefined;
};
a();
a();
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
 - 4: NaN
 - 5: 1
 - 6: 2
 - 7: NaN
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
