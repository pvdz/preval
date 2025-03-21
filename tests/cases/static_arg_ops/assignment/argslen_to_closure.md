# Preval test case

# argslen_to_closure.md

> Static arg ops > Assignment > Argslen to closure
>
> This was detected as closure to closure

## Input

`````js filename=intro

function f(a) { if (a) return $(1); else return $(2); }
const one = f(10);
const two = f(20);
$(one, two);
`````


## Settled


`````js filename=intro
const one /*:unknown*/ = $(1);
const two /*:unknown*/ = $(1);
$(one, two);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(1), $(1));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( 1 );
$( a, b );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1, 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
