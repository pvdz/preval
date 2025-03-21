# Preval test case

# spread_outer_global.md

> Function trampoline > Call only > Spread outer global
>
> A trampoline is a function that just calls another function, and maybe returns its return value

## Input

`````js filename=intro
const x = $('pass');
const f = function(y) {
  $(y);
};
f(...x); // This should NOT be inlined (for now) because we can't safely reason about the spread
         // (In the future we could still translate this case by $(x[0]) but that'll be a very specific rule)
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(`pass`);
const f /*:(unknown)=>undefined*/ = function ($$0) {
  const y /*:unknown*/ = $$0;
  debugger;
  $(y);
  return undefined;
};
f(...x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $(`pass`);
const f = function (y) {
  $(y);
};
f(...x);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "pass" );
const b = function($$0 ) {
  const c = $$0;
  debugger;
  $( c );
  return undefined;
};
b( ...a );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'pass'
 - 2: 'p'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
