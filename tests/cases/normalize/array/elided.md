# Preval test case

# elided.md

> Normalize > Array > Elided
>
> Make sure normalization doesn't choke over elided elements

## Input

`````js filename=intro
$([1, $(),, 2,, $(),,]);
`````


## Settled


`````js filename=intro
const tmpArrElement$1 /*:unknown*/ = $();
const tmpArrElement$5 /*:unknown*/ = $();
const tmpCalleeParam /*:array*/ = [1, tmpArrElement$1, , 2, , tmpArrElement$5, ,];
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpArrElement$1 = $();
const tmpArrElement$5 = $();
$([1, tmpArrElement$1, , 2, , tmpArrElement$5, ,]);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $();
const b = $();
const c = [ 1, a, ,, 2, ,, b, , ];
$( c );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 
 - 2: 
 - 3: [1, undefined, , 2, , undefined]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
