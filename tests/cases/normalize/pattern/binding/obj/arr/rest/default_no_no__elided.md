# Preval test case

# default_no_no__elided.md

> Normalize > Pattern > Binding > Obj > Arr > Rest > Default no no  elided
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
const { x: [...y] } = { x: [, , , 1], a: 11, b: 12 };
$(y);
`````


## Settled


`````js filename=intro
const y /*:array*/ /*truthy*/ = [undefined, undefined, undefined, 1];
$(y);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$([undefined, undefined, undefined, 1]);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ undefined, undefined, undefined, 1 ];
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpObjLitVal = [, , , 1];
const tmpBindingPatternObjRoot = { x: tmpObjLitVal, a: 11, b: 12 };
const tmpOPND = tmpBindingPatternObjRoot.x;
const tmpArrPatternSplat = [...tmpOPND];
const tmpMCF = tmpArrPatternSplat.slice;
const y = $dotCall(tmpMCF, tmpArrPatternSplat, `slice`, 0);
$(y);
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) access object property that also exists on prototype? $array_slice
- (todo) array reads var statement with init CallExpression
- (todo) array reads var statement with init ObjectExpression
- (todo) support array reads statement type ExpressionStatement
- (todo) type trackeed tricks can possibly support static $array_slice


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [undefined, undefined, undefined, 1]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
