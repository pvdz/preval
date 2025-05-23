# Preval test case

# spread_inner_global.md

> Function trampoline > Call return > Spread inner global
>
> A trampoline is a function that just calls another function, and maybe returns its return value

## Input

`````js filename=intro
const x = $('pass');
const f = function() {
  const r = $(...x);
  return r;
};
const q = f(); // In this test, this is the call we expect to be replaced by trampoline inlining...
$(q);
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(`pass`);
const q /*:unknown*/ = $(...x);
$(q);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $(`pass`);
$($(...x));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "pass" );
const b = $( ...a );
$( b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const x = $(`pass`);
const f = function () {
  debugger;
  const r = $(...x);
  return r;
};
const q = f();
$(q);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'pass'
 - 2: 'p', 'a', 's', 's'
 - 3: 'p'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
