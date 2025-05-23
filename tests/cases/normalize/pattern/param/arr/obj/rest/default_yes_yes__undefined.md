# Preval test case

# default_yes_yes__undefined.md

> Normalize > Pattern > Param > Arr > Obj > Rest > Default yes yes  undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f([{ ...x } = $({ a: 'fail' })] = $([{ a: 'pass2' }])) {
  return x;
}
$(f(undefined, 200));
`````


## Settled


`````js filename=intro
const tmpArrElement /*:object*/ = { a: `pass2` };
const tmpCalleeParam /*:array*/ = [tmpArrElement];
const tmpBindingPatternArrRoot /*:unknown*/ = $(tmpCalleeParam);
const tmpArrPatternSplat /*:array*/ = [...tmpBindingPatternArrRoot];
const tmpAPBD /*:unknown*/ = tmpArrPatternSplat[0];
let tmpArrPatternStep /*:unknown*/ /*ternaryConst*/ = undefined;
const tmpIfTest$1 /*:boolean*/ = tmpAPBD === undefined;
if (tmpIfTest$1) {
  const tmpCalleeParam$1 /*:object*/ = { a: `fail` };
  tmpArrPatternStep = $(tmpCalleeParam$1);
} else {
  tmpArrPatternStep = tmpAPBD;
}
const tmpCalleeParam$5 /*:array*/ = [];
const x /*:unknown*/ = $objPatternRest(tmpArrPatternStep, tmpCalleeParam$5, undefined);
$(x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpArrElement = { a: `pass2` };
const tmpBindingPatternArrRoot = $([tmpArrElement]);
const tmpAPBD = [...tmpBindingPatternArrRoot][0];
let tmpArrPatternStep = undefined;
if (tmpAPBD === undefined) {
  tmpArrPatternStep = $({ a: `fail` });
} else {
  tmpArrPatternStep = tmpAPBD;
}
$($objPatternRest(tmpArrPatternStep, [], undefined));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { a: "pass2" };
const b = [ a ];
const c = $( b );
const d = [ ...c ];
const e = d[ 0 ];
let f = undefined;
const g = e === undefined;
if (g) {
  const h = { a: "fail" };
  f = $( h );
}
else {
  f = e;
}
const i = [];
const j = $objPatternRest( f, i, undefined );
$( j );
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) support array reads statement type VarStatement
- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [{ a: '"pass2"' }]
 - 2: { a: '"pass2"' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
