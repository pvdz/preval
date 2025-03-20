# Preval test case

# complex_args.md

> Normalize > New > Complex args
>
> The `new` operator should apply to a single identifier. A literal can also work though it would lead to a runtime error.

## Input

`````js filename=intro
$(new Array(5 + 5, $(), Array.prototype.length));
`````


## Settled


`````js filename=intro
const tmpCalleeParam$3 /*:unknown*/ = $();
const tmpCalleeParam /*:array*/ = [10, tmpCalleeParam$3, 0];
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCalleeParam$3 = $();
$([10, tmpCalleeParam$3, 0]);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $();
const b = [ 10, a, 0 ];
$( b );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 
 - 2: [10, undefined, 0]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
