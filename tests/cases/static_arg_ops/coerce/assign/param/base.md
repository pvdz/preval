# Preval test case

# base.md

> Static arg ops > Coerce > Assign > Param > Base

## Input

`````js filename=intro
let x = $('50');
const f = function (c, d) {
  d = $coerce(x, 'number');
  $(1);
  $(2);
  $(d);
};
f(3);
f(4);
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(`50`);
const f /*:()=>undefined*/ = function () {
  debugger;
  const d /*:number*/ = $coerce(x, `number`);
  $(1);
  $(2);
  $(d);
  return undefined;
};
f();
f();
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $(`50`);
const f = function () {
  const d = Number(x);
  $(1);
  $(2);
  $(d);
};
f();
f();
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "50" );
const b = function() {
  debugger;
  const c = $coerce( a, "number" );
  $( 1 );
  $( 2 );
  $( c );
  return undefined;
};
b();
b();
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = $(`50`);
const f = function ($$0, $$1) {
  let c = $$0;
  let d = $$1;
  debugger;
  d = $coerce(x, `number`);
  $(1);
  $(2);
  $(d);
  return undefined;
};
f(3);
f(4);
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
 - 4: 50
 - 5: 1
 - 6: 2
 - 7: 50
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
