# Preval test case

# spread_inner_param.md

> Function trampoline > Call return > Spread inner param
>
> A trampoline is a function that just calls another function, and maybe returns its return value

## Input

`````js filename=intro
const y = $('pass');
const f = function(x) {
  const r = $(...x);
  return r;
};
const q = f(y); // In this test, this is the call we expect to be replaced by trampoline inlining...
$(q);
`````


## Settled


`````js filename=intro
const y /*:unknown*/ = $(`pass`);
const q /*:unknown*/ = $(...y);
$(q);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const y = $(`pass`);
$($(...y));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "pass" );
const b = $( ...a );
$( b );
`````


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
