# Preval test case

# expensive_property.md

> Normalize > Compound > Expensive property
>
> When decomposing compound assignments to properties we must make sure to retain observable runtime semantics. Consider: "what if the property is a getter?"

## Input

`````js filename=intro
function superExpensiveFunction() {
  // This will be inlined eventually (I hope) but the normalized code should take care not to call this function twice.
  return $();
}

// The normalized code should cache the value of the func call first before decomposing the compound assignment
superExpensiveFunction().x += 5;
`````


## Settled


`````js filename=intro
const tmpAssignMemLhsObj /*:unknown*/ = $();
const tmpCompoundAssignLhs /*:unknown*/ = tmpAssignMemLhsObj.x;
const tmpAssignMemRhs /*:primitive*/ = tmpCompoundAssignLhs + 5;
tmpAssignMemLhsObj.x = tmpAssignMemRhs;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpAssignMemLhsObj = $();
tmpAssignMemLhsObj.x = tmpAssignMemLhsObj.x + 5;
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $();
const b = a.x;
const c = b + 5;
a.x = c;
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
