# Preval test case

# tramp_return_call_ident2.md

> Function inlining > Tramp return call ident2
>
> A function returning the call to another function

## Input

`````js filename=intro
const f = function() {
  const x = $();
  return x;
};
const r = f();
$(r);
`````


## Settled


`````js filename=intro
const r /*:unknown*/ = $();
$(r);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($());
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $();
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const f = function () {
  debugger;
  const x = $();
  return x;
};
const r = f();
$(r);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
