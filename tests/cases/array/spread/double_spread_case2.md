# Preval test case

# double_spread_case2.md

> Array > Spread > Double spread case2
>
> Spreading an array into another array that is assigned to a binding

A double spread has the danger of the first case messing with indexes for the second case.

The spreads must be resolved in a first step, back to front, and injections should happen in a second step, also back to front.

## Input

`````js filename=intro
const x = [];
const y = [];
const aa = [];
const zz = [];
$(aa, zz, a, b);
`````


## Settled


`````js filename=intro
const aa /*:array*/ = [];
const zz /*:array*/ = [];
$(aa, zz, a, b);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$([], [], a, b);
`````


## PST Settled
With rename=true

`````js filename=intro
const c = [];
const d = [];
$( c, d, a, b );
`````


## Todos triggered


- (todo) support array reads statement type VarStatement
- (todo) support array reads statement type ExpressionStatement


## Globals


BAD@! Found 2 implicit global bindings:

a, b


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
