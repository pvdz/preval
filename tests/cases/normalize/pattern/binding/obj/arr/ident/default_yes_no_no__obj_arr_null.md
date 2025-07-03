# Preval test case

# default_yes_no_no__obj_arr_null.md

> Normalize > Pattern > Binding > Obj > Arr > Ident > Default yes no no  obj arr null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
const { x: [y = 'fail'] } = { x: [null], a: 11, b: 12 };
$(y);
`````


## Settled


`````js filename=intro
$(null);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(null);
`````


## PST Settled
With rename=true

`````js filename=intro
$( null );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpObjLitVal = [null];
const tmpBindingPatternObjRoot = { x: tmpObjLitVal, a: 11, b: 12 };
const tmpOPND = tmpBindingPatternObjRoot.x;
const tmpArrPatternSplat = [...tmpOPND];
const tmpAPBD = tmpArrPatternSplat[0];
let y = undefined;
const tmpIfTest = tmpAPBD === undefined;
if (tmpIfTest) {
  y = `fail`;
  $(y);
} else {
  y = tmpAPBD;
  $(tmpAPBD);
}
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
 - 1: null
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
