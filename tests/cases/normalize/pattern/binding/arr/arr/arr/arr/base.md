# Preval test case

# base.md

> Normalize > Pattern > Binding > Arr > Arr > Arr > Arr > Base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
const [[[[]]]] = [[[[1, 2, 3], 4, 5], 20, 30], 40, 50];
$('ok');
`````


## Settled


`````js filename=intro
$(`ok`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`ok`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "ok" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpArrElement$3 = [1, 2, 3];
const tmpArrElement$1 = [tmpArrElement$3, 4, 5];
const tmpArrElement = [tmpArrElement$1, 20, 30];
const tmpBindingPatternArrRoot = [tmpArrElement, 40, 50];
const tmpArrPatternSplat = [...tmpBindingPatternArrRoot];
const tmpArrPatternStep = tmpArrPatternSplat[0];
const tmpArrPatternSplat$1 = [...tmpArrPatternStep];
const tmpArrPatternStep$1 = tmpArrPatternSplat$1[0];
const tmpArrPatternSplat$3 = [...tmpArrPatternStep$1];
const tmpArrPatternStep$3 = tmpArrPatternSplat$3[0];
const tmpArrPatternSplat$5 = [...tmpArrPatternStep$3];
$(`ok`);
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
 - 1: 'ok'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
