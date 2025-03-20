# Preval test case

# base.md

> Normalize > Pattern > Param > Obj > Obj > Obj > Rest > Base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f({
  x: {
    y: { ...z },
  },
}) {
  return z;
}
$(f({ x: { x: 13, y: { z: 1, a: 2, b: 3 }, z: 14 }, b: 11, c: 12 }, 10));
`````


## Settled


`````js filename=intro
const tmpObjLitVal$3 /*:object*/ = { z: 1, a: 2, b: 3 };
const tmpCalleeParam$1 /*:array*/ = [];
const z /*:unknown*/ = $objPatternRest(tmpObjLitVal$3, tmpCalleeParam$1, undefined);
$(z);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpObjLitVal$3 = { z: 1, a: 2, b: 3 };
$($objPatternRest(tmpObjLitVal$3, [], undefined));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = {
  z: 1,
  a: 2,
  b: 3,
};
const b = [];
const c = $objPatternRest( a, b, undefined );
$( c );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { z: '1', a: '2', b: '3' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
