# Preval test case

# regression.md

> Arr mutation > Regression
>
> There was a bug in arr_mutation where it would replace the
> initial `[0]` with `[d]`, introducing a TDZ throw.

## Input

`````js filename=intro
let a = [0];
const d = $();
a[0] = d;
$(a);
`````


## Settled


`````js filename=intro
const d /*:unknown*/ = $();
const a /*:array*/ = [d];
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const d = $();
$([d]);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $();
const b = [ a ];
$( b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = [0];
const d = $();
a[0] = d;
$(a);
`````


## Todos triggered


- (todo) support array reads statement type ExpressionStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 
 - 2: [undefined]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
