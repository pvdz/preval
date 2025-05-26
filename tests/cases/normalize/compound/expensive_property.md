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
const tmpClusterSSA_tmpAssignMemLhsObj /*:unknown*/ = $();
const tmpCompoundAssignLhs /*:unknown*/ = tmpClusterSSA_tmpAssignMemLhsObj.x;
const tmpAssignMemRhs /*:primitive*/ = tmpCompoundAssignLhs + 5;
tmpClusterSSA_tmpAssignMemLhsObj.x = tmpAssignMemRhs;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpClusterSSA_tmpAssignMemLhsObj = $();
tmpClusterSSA_tmpAssignMemLhsObj.x = tmpClusterSSA_tmpAssignMemLhsObj.x + 5;
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $();
const b = a.x;
const c = b + 5;
a.x = c;
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let superExpensiveFunction = function () {
  debugger;
  const tmpReturnArg = $();
  return tmpReturnArg;
};
const tmpAssignMemLhsObj = superExpensiveFunction();
const tmpCompoundAssignLhs = tmpAssignMemLhsObj.x;
const tmpAssignMemLhsObj$1 = tmpAssignMemLhsObj;
const tmpAssignMemRhs = tmpCompoundAssignLhs + 5;
tmpAssignMemLhsObj$1.x = tmpAssignMemRhs;
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
