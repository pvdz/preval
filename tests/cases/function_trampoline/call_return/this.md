# Preval test case

# this.md

> Function trampoline > Call return > This
>
> A trampoline is a function that just calls another function, and maybe returns its return value

## Input

`````js filename=intro
const f = function(a, b, c, d, e) {
  const r = $(this);
  return r;
};
const q = f(1, 2, 3, 4, 5); // The use of `this` should prevent inlining this call, for now
$(q);
`````


## Settled


`````js filename=intro
const q /*:unknown*/ = $(undefined);
$(q);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(undefined));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( undefined );
$( a );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: undefined
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
