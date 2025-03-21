# Preval test case

# call_second_param.md

> Function trampoline > Call return > Call second param
>
> A trampoline is a function that just calls another function, and maybe returns its return value

## Input

`````js filename=intro
const f = function(a, b, c, d, e) {
  const r = $(c);
  return r;
};
const q = f(1, 2, 3, 4, 5); // This should end up being $(3)
$(q);
`````


## Settled


`````js filename=intro
const q /*:unknown*/ = $(3);
$(q);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(3));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 3 );
$( a );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 3
 - 2: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
