# Preval test case

# base.md

> Normalize > Pattern > Assignment > Arr > Arr > Obj > Ident > Base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
([[{ x }]] = [[{ x: 1 }, 20, 30], 40, 50]);
$(x);
`````


## Settled


`````js filename=intro
x = 1;
$(x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
x = 1;
$(x);
`````


## PST Settled
With rename=true

`````js filename=intro
x = 1;
$( x );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpArrElement$1 = { x: 1 };
const tmpArrElement = [tmpArrElement$1, 20, 30];
const tmpArrAssignPatternRhs = [tmpArrElement, 40, 50];
const tmpArrPatternSplat = [...tmpArrAssignPatternRhs];
const tmpArrPatternStep = tmpArrPatternSplat[0];
const tmpArrPatternSplat$1 = [...tmpArrPatternStep];
const tmpArrPatternStep$1 = tmpArrPatternSplat$1[0];
x = tmpArrPatternStep$1.x;
$(x);
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) array reads var statement with init MemberExpression
- (todo) can we always safely clone ident refs in this case?
- (todo) support array reads statement type ExpressionStatement
- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


## Globals


BAD@! Found 1 implicit global bindings:

x


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
