# Preval test case

# pattern.md

> Normalize > Binding > For-a > Pattern
>
> Assignments of all kinds should be normalized in all circumstances

## Input

`````js filename=intro
let x = 1, y = 2, z = [10, 20, 30];
for (let [x, y] = z;false;) $(x, y, z);
`````


## Settled


`````js filename=intro

`````


## Denormalized
(This ought to be the final result)

`````js filename=intro

`````


## PST Settled
With rename=true

`````js filename=intro

`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = 1;
let y = 2;
let z = [10, 20, 30];
let tmpBindingPatternArrRoot = z;
let tmpArrPatternSplat = [...tmpBindingPatternArrRoot];
let x$1 = tmpArrPatternSplat[0];
let y$1 = tmpArrPatternSplat[1];
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) support array reads statement type VarStatement
- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
