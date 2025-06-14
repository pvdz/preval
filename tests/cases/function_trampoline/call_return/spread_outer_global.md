# Preval test case

# spread_outer_global.md

> Function trampoline > Call return > Spread outer global
>
> A trampoline is a function that just calls another function, and maybe returns its return value

## Input

`````js filename=intro
const x = $('pass');
const f = function(y) {
  const r = $(y);
  return r;
};
const q = f(...x); // This should NOT be inlined (for now) because we can't safely reason about the spread
                   // (In the future we could still translate this case by $(x[0]) but that'll be a very specific rule)
$(q);
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(`pass`);
const f /*:(unknown)=>unknown*/ = function ($$0) {
  const y /*:unknown*/ = $$0;
  debugger;
  const r /*:unknown*/ = $(y);
  return r;
};
const q /*:unknown*/ = f(...x);
$(q);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $(`pass`);
const f = function (y) {
  const r = $(y);
  return r;
};
$(f(...x));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "pass" );
const b = function($$0 ) {
  const c = $$0;
  debugger;
  const d = $( c );
  return d;
};
const e = b( ...a );
$( e );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const x = $(`pass`);
const f = function ($$0) {
  let y = $$0;
  debugger;
  const r = $(y);
  return r;
};
const q = f(...x);
$(q);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'pass'
 - 2: 'p'
 - 3: 'p'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
