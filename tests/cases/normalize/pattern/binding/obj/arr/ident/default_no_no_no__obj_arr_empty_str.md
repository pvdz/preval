# Preval test case

# default_no_no_no__obj_arr_empty_str.md

> Normalize > Pattern > Binding > Obj > Arr > Ident > Default no no no  obj arr empty str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
const { x: [y] } = { x: [''], a: 11, b: 12 };
$(y);
`````


## Settled


`````js filename=intro
$(``);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(``);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpObjLitVal = [``];
const tmpBindingPatternObjRoot = { x: tmpObjLitVal, a: 11, b: 12 };
const tmpOPND = tmpBindingPatternObjRoot.x;
const tmpArrPatternSplat = [...tmpOPND];
const y = tmpArrPatternSplat[0];
$(y);
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) array reads var statement with init ObjectExpression
- (todo) support array reads statement type ExpressionStatement
- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: ''
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
