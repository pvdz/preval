# Preval test case

# default_yes_yes__empty.md

> Normalize > Pattern > Param > Obj > Arr > Rest > Default yes yes  empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f({ x: [...y] = $(['fail']) } = $({ x: ['pass2'] })) {
  return y;
}
$(f());
`````


## Settled


`````js filename=intro
const tmpObjLitVal /*:array*/ = [`pass2`];
const tmpCalleeParam /*:object*/ = { x: tmpObjLitVal };
const tmpClusterSSA_tmpBindingPatternObjRoot /*:unknown*/ = $(tmpCalleeParam);
const tmpOPBD /*:unknown*/ = tmpClusterSSA_tmpBindingPatternObjRoot.x;
let tmpOPAD /*:unknown*/ = undefined;
const tmpIfTest$1 /*:boolean*/ = tmpOPBD === undefined;
if (tmpIfTest$1) {
  const tmpCalleeParam$1 /*:array*/ = [`fail`];
  tmpOPAD = $(tmpCalleeParam$1);
} else {
  tmpOPAD = tmpOPBD;
}
const tmpArrPatternSplat /*:array*/ = [...tmpOPAD];
const y /*:array*/ = $dotCall($array_slice, tmpArrPatternSplat, `slice`, 0);
$(y);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpObjLitVal = [`pass2`];
const tmpOPBD = $({ x: tmpObjLitVal }).x;
let tmpOPAD = undefined;
if (tmpOPBD === undefined) {
  tmpOPAD = $([`fail`]);
} else {
  tmpOPAD = tmpOPBD;
}
$($dotCall($array_slice, [...tmpOPAD], `slice`, 0));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ "pass2" ];
const b = { x: a };
const c = $( b );
const d = c.x;
let e = undefined;
const f = d === undefined;
if (f) {
  const g = [ "fail" ];
  e = $( g );
}
else {
  e = d;
}
const h = [ ...e ];
const i = $dotCall( $array_slice, h, "slice", 0 );
$( i );
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) access object property that also exists on prototype? $array_slice
- (todo) type trackeed tricks can possibly support static $array_slice


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { x: '["pass2"]' }
 - 2: ['pass2']
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
