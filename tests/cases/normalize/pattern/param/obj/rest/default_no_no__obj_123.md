# Preval test case

# default_no_no__obj_123.md

> Normalize > Pattern > Param > Obj > Rest > Default no no  obj 123
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f({ ...x } = $({ a: 'fail' })) {
  return x;
}
$(f({ x: 1, b: 2, c: 3 }, 10));
`````


## Settled


`````js filename=intro
const tmpBindingPatternObjRoot /*:object*/ = { x: 1, b: 2, c: 3 };
const tmpCalleeParam$3 /*:array*/ = [];
const x /*:unknown*/ = $objPatternRest(tmpBindingPatternObjRoot, tmpCalleeParam$3, `x`);
$(x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpBindingPatternObjRoot = { x: 1, b: 2, c: 3 };
$($objPatternRest(tmpBindingPatternObjRoot, [], `x`));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = {
  x: 1,
  b: 2,
  c: 3,
};
const b = [];
const c = $objPatternRest( a, b, "x" );
$( c );
`````


## Todos triggered


- (todo) support array reads statement type VarStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { x: '1', b: '2', c: '3' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
