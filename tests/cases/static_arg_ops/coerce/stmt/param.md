# Preval test case

# param.md

> Static arg ops > Coerce > Stmt > Param

## Input

`````js filename=intro
let x = $('50');
const f = function (c) {
  $coerce(c, 'number');
  $(1);
  $(2);
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
  return undefined;
};
a();
a();
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '50'
 - 2: 1
 - 3: 2
 - 4: 1
 - 5: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
