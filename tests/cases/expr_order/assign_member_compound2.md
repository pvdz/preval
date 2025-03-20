# Preval test case

# assign_member_compound2.md

> Expr order > Assign member compound2
>
> The order of occurrence is relevant.

Must take into account that the simple node i will still change value if we move the complex node to appear before it.

## Input

`````js filename=intro
let a = {};
a.foo = a += $();
`````


## Settled


`````js filename=intro
const tmpBinBothRhs /*:unknown*/ = $();
const a /*:object*/ = {};
const tmpClusterSSA_a /*:primitive*/ = a + tmpBinBothRhs;
a.foo = tmpClusterSSA_a;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpBinBothRhs = $();
const a = {};
a.foo = a + tmpBinBothRhs;
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $();
const b = {};
const c = b + a;
b.foo = c;
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
