# Preval test case

# base.md

> Normalize > Pattern > Param > Obj > Obj > Rest > Base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f({ x: { ...y } }) {
  return y;
}
$(f({ x: { x: 1, y: 2, z: 3 }, b: 11, c: 12 }, 10));
`````


## Settled


`````js filename=intro
const tmpObjLitVal /*:object*/ /*truthy*/ = { x: 1, y: 2, z: 3 };
const tmpCalleeParam$1 /*:array*/ /*truthy*/ = [];
const y /*:unknown*/ = $objPatternRest(tmpObjLitVal, tmpCalleeParam$1, undefined);
$(y);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpObjLitVal = { x: 1, y: 2, z: 3 };
$($objPatternRest(tmpObjLitVal, [], undefined));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = {
  x: 1,
  y: 2,
  z: 3,
};
const b = [];
const c = $objPatternRest( a, b, undefined );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let tmpBindingPatternObjRoot = tmpParamBare;
  let tmpOPND = tmpBindingPatternObjRoot.x;
  let tmpCalleeParam = tmpOPND;
  let tmpCalleeParam$1 = [];
  let y = $objPatternRest(tmpCalleeParam, tmpCalleeParam$1, undefined);
  return y;
};
const tmpCallCallee = f;
const tmpObjLitVal = { x: 1, y: 2, z: 3 };
let tmpCalleeParam$5 = { x: tmpObjLitVal, b: 11, c: 12 };
let tmpCalleeParam$3 = f(tmpCalleeParam$5, 10);
$(tmpCalleeParam$3);
`````


## Todos triggered


- (todo) support array reads statement type VarStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { x: '1', y: '2', z: '3' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
