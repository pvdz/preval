# Preval test case

# default_yes_yes_yes__obj_undefined.md

> Normalize > Pattern > Param > Obj > Arr > Ident > Default yes yes yes  obj undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f({ x: [y = 'fail'] = $(['pass2']) } = $({ x: ['pass3'] })) {
  return y;
}
$(f({ x: undefined, a: 11, b: 12 }, 10));
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:array*/ = [`pass2`];
const tmpOPAD /*:unknown*/ = $(tmpCalleeParam$1);
const tmpArrPatternSplat /*:array*/ = [...tmpOPAD];
const tmpAPBD /*:unknown*/ = tmpArrPatternSplat[0];
const tmpIfTest$3 /*:boolean*/ = tmpAPBD === undefined;
if (tmpIfTest$3) {
  $(`fail`);
} else {
  $(tmpAPBD);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpOPAD = $([`pass2`]);
const tmpAPBD = [...tmpOPAD][0];
if (tmpAPBD === undefined) {
  $(`fail`);
} else {
  $(tmpAPBD);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ "pass2" ];
const b = $( a );
const c = [ ...b ];
const d = c[ 0 ];
const e = d === undefined;
if (e) {
  $( "fail" );
}
else {
  $( d );
}
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) support array reads statement type ExpressionStatement
- (todo) support array reads statement type VarStatement
- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: ['pass2']
 - 2: 'pass2'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
