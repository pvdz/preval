# Preval test case

# base.md

> Normalize > Pattern > Param > Obj > Obj > Obj > Arr > Base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f({
  x: {
    y: {
      z: [],
    },
  },
}) {
  return 'ok';
}
$(f({ x: { x: 13, y: { z: [1, 2, 3], a: 15, b: 16 }, z: 14 }, b: 11, c: 12 }, 10));
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
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let tmpBindingPatternObjRoot = tmpParamBare;
  let tmpOPND = tmpBindingPatternObjRoot.x;
  let tmpOPND$1 = tmpOPND.y;
  let tmpOPND$3 = tmpOPND$1.z;
  let tmpArrPatternSplat = [...tmpOPND$3];
  return `ok`;
};
const tmpCallCallee = f;
const tmpObjLitVal$1 = 13;
const tmpObjLitVal$5 = [1, 2, 3];
const tmpObjLitVal$3 = { z: tmpObjLitVal$5, a: 15, b: 16 };
const tmpObjLitVal = { x: tmpObjLitVal$1, y: tmpObjLitVal$3, z: 14 };
let tmpCalleeParam$1 = { x: tmpObjLitVal, b: 11, c: 12 };
let tmpCalleeParam = f(tmpCalleeParam$1, 10);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) array reads var statement with init ObjectExpression
- (todo) support array reads statement type ExpressionStatement


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
