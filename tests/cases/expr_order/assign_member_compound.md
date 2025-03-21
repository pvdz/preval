# Preval test case

# assign_member_compound.md

> Expr order > Assign member compound
>
> The order of occurrence is relevant.

Must take into account that the simple node i will still change value if we move the complex node to appear before it.

## Input

`````js filename=intro
let a = {};
a.foo += a = $();
`````

## Settled


`````js filename=intro
const tmpCompoundAssignLhs /*:unknown*/ = $Object_prototype.foo;
const tmpClusterSSA_a /*:unknown*/ = $();
tmpCompoundAssignLhs + tmpClusterSSA_a;
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$Object_prototype.foo + $();
`````

## Pre Normal


`````js filename=intro
let a = {};
a.foo += a = $();
`````

## Normalized


`````js filename=intro
let a = {};
const tmpCompoundAssignLhs = a.foo;
const tmpAssignMemLhsObj = a;
const tmpBinBothLhs = tmpCompoundAssignLhs;
a = $();
let tmpBinBothRhs = a;
const tmpAssignMemRhs = tmpBinBothLhs + tmpBinBothRhs;
tmpAssignMemLhsObj.foo = tmpAssignMemRhs;
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $Object_prototype.foo;
const b = $();
a + b;
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
