# Preval test case

# assign_member.md

> Expr order > Assign member
>
> The order of occurrence is relevant.

Must take into account that the simple node i will still change value if we move the complex node to appear before it.

## Input

`````js filename=intro
let a = {};
a.foo = a = $();
$(a);
`````

## Settled


`````js filename=intro
const tmpClusterSSA_a /*:unknown*/ = $();
$(tmpClusterSSA_a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$($());
`````

## Pre Normal


`````js filename=intro
let a = {};
a.foo = a = $();
$(a);
`````

## Normalized


`````js filename=intro
let a = {};
const tmpAssignMemLhsObj = a;
a = $();
let tmpAssignMemRhs = a;
tmpAssignMemLhsObj.foo = tmpAssignMemRhs;
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $();
$( a );
`````

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
