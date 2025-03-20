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
const bindingPatternArrRoot /*:unknown*/ = $(tmpCalleeParam);
const arrPatternSplat /*:array*/ = [...bindingPatternArrRoot];
const arrPatternBeforeDefault /*:unknown*/ = arrPatternSplat[0];
let tmpCalleeParam$3 /*:unknown*/ = undefined;
const tmpIfTest$1 /*:boolean*/ = arrPatternBeforeDefault === undefined;
if (tmpIfTest$1) {
  const tmpCalleeParam$1 /*:object*/ = { a: `fail` };
  const tmpClusterSSA_arrPatternStep /*:unknown*/ = $(tmpCalleeParam$1);
  tmpCalleeParam$3 = tmpClusterSSA_arrPatternStep;
} else {
  tmpCalleeParam$3 = arrPatternBeforeDefault;
}
const tmpCalleeParam$5 /*:array*/ = [];
const x /*:unknown*/ = $objPatternRest(tmpCalleeParam$3, tmpCalleeParam$5, undefined);
$(x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpArrElement = { a: `pass2` };
const bindingPatternArrRoot = $([tmpArrElement]);
const arrPatternBeforeDefault = [...bindingPatternArrRoot][0];
let tmpCalleeParam$3 = undefined;
if (arrPatternBeforeDefault === undefined) {
  tmpCalleeParam$3 = $({ a: `fail` });
} else {
  tmpCalleeParam$3 = arrPatternBeforeDefault;
}
$($objPatternRest(tmpCalleeParam$3, [], undefined));
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
  const i = $( h );
  f = i;
}
else {
  f = e;
}
const j = [];
const k = $objPatternRest( f, j, undefined );
$( k );
`````


## Todos triggered


- inline computed array property read
- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


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
