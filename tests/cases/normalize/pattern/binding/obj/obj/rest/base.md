# Preval test case

# base.md

> Normalize > Pattern > Binding > Obj > Obj > Rest > Base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
const { x: { ...y } } = { x: { x: 1, y: 2, z: 3 }, b: 11, c: 12 };
$(y);
`````


## Settled


`````js filename=intro
const tmpObjLitVal /*:object*/ = { x: 1, y: 2, z: 3 };
const tmpCalleeParam$1 /*:array*/ = [];
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
