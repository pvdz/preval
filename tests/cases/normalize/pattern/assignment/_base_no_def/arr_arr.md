# Preval test case

# arr_arr.md

> Normalize > Pattern > Assignment > Base no def > Arr arr
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
let x = 10;
([[ x ]] = [[ 100 ]]);
$(x);
`````


## Settled


`````js filename=intro
$(100);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(100);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 100 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = 10;
const tmpArrElement = [100];
const tmpArrAssignPatternRhs = [tmpArrElement];
const tmpArrPatternSplat = [...tmpArrAssignPatternRhs];
const tmpArrPatternStep = tmpArrPatternSplat[0];
const tmpArrPatternSplat$1 = [...tmpArrPatternStep];
x = tmpArrPatternSplat$1[0];
$(x);
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) array reads var statement with init MemberExpression
- (todo) can we always safely clone ident refs in this case?
- (todo) support array reads statement type ExpressionStatement
- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
