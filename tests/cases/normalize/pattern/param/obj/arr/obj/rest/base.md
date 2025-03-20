# Preval test case

# base.md

> Normalize > Pattern > Param > Obj > Arr > Obj > Rest > Base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f({ x: [{ ...y }] }) {
  return y;
}
$(f({ x: [{ x: 1, y: 2, c: 3 }, 13, 14], a: 11, b: 12 }, 10));
`````


## Settled


`````js filename=intro
const tmpArrElement /*:object*/ = { x: 1, y: 2, c: 3 };
const tmpCalleeParam$1 /*:array*/ = [];
const y /*:unknown*/ = $objPatternRest(tmpArrElement, tmpCalleeParam$1, undefined);
$(y);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpArrElement = { x: 1, y: 2, c: 3 };
$($objPatternRest(tmpArrElement, [], undefined));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = {
  x: 1,
  y: 2,
  c: 3,
};
const b = [];
const c = $objPatternRest( a, b, undefined );
$( c );
`````


## Todos triggered


- inline computed array property read
- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { x: '1', y: '2', c: '3' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
