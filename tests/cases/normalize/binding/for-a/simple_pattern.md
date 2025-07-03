# Preval test case

# simple_pattern.md

> Normalize > Binding > For-a > Simple pattern
>
> Assignments of all kinds should be normalized in all circumstances

## Input

`````js filename=intro
let a = 1, x = 1, y = 2, z = [10, 20, 30];
for (let a = [x, y] = z;false;) $(a, x, y, z);
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
let a = 1;
let x = 1;
let y = 2;
let z = [10, 20, 30];
let a$1 = undefined;
const tmpNestedAssignArrPatternRhs = z;
const tmpArrPatternSplat = [...tmpNestedAssignArrPatternRhs];
x = tmpArrPatternSplat[0];
y = tmpArrPatternSplat[1];
a$1 = tmpNestedAssignArrPatternRhs;
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) array reads var statement with init ArrayExpression
- (todo) support array reads statement type ExpressionStatement
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
