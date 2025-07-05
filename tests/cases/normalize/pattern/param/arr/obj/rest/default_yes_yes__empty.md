# Preval test case

# default_yes_yes__empty.md

> Normalize > Pattern > Param > Arr > Obj > Rest > Default yes yes  empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f([{ ...x } = $({ a: 'fail' })] = $([{ a: 'pass2' }])) {
  return x;
}
$(f());
`````


## Settled


`````js filename=intro
const tmpArrElement /*:object*/ /*truthy*/ = { a: `pass2` };
const tmpCalleeParam /*:array*/ /*truthy*/ = [tmpArrElement];
const tmpClusterSSA_tmpBindingPatternArrRoot /*:unknown*/ = $(tmpCalleeParam);
const tmpArrPatternSplat /*:array*/ /*truthy*/ = [...tmpClusterSSA_tmpBindingPatternArrRoot];
const tmpAPBD /*:unknown*/ = tmpArrPatternSplat[0];
let tmpCalleeParam$3 /*:unknown*/ /*ternaryConst*/ = undefined;
const tmpIfTest$1 /*:boolean*/ = tmpAPBD === undefined;
if (tmpIfTest$1) {
  const tmpCalleeParam$1 /*:object*/ /*truthy*/ = { a: `fail` };
  tmpCalleeParam$3 = $(tmpCalleeParam$1);
} else {
  tmpCalleeParam$3 = tmpAPBD;
}
const tmpCalleeParam$5 /*:array*/ /*truthy*/ = [];
const x /*:unknown*/ = $objPatternRest(tmpCalleeParam$3, tmpCalleeParam$5, undefined);
$(x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpArrElement = { a: `pass2` };
const tmpClusterSSA_tmpBindingPatternArrRoot = $([tmpArrElement]);
const tmpAPBD = [...tmpClusterSSA_tmpBindingPatternArrRoot][0];
let tmpCalleeParam$3 = undefined;
if (tmpAPBD === undefined) {
  tmpCalleeParam$3 = $({ a: `fail` });
} else {
  tmpCalleeParam$3 = tmpAPBD;
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
  f = $( h );
}
else {
  f = e;
}
const i = [];
const j = $objPatternRest( f, i, undefined );
$( j );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let tmpBindingPatternArrRoot = undefined;
  const tmpIfTest = tmpParamBare === undefined;
  if (tmpIfTest) {
    const tmpArrElement = { a: `pass2` };
    let tmpCalleeParam = [tmpArrElement];
    tmpBindingPatternArrRoot = $(tmpCalleeParam);
  } else {
    tmpBindingPatternArrRoot = tmpParamBare;
  }
  let tmpArrPatternSplat = [...tmpBindingPatternArrRoot];
  let tmpAPBD = tmpArrPatternSplat[0];
  let tmpArrPatternStep = undefined;
  const tmpIfTest$1 = tmpAPBD === undefined;
  if (tmpIfTest$1) {
    let tmpCalleeParam$1 = { a: `fail` };
    tmpArrPatternStep = $(tmpCalleeParam$1);
  } else {
    tmpArrPatternStep = tmpAPBD;
  }
  let tmpCalleeParam$3 = tmpArrPatternStep;
  let tmpCalleeParam$5 = [];
  let x = $objPatternRest(tmpCalleeParam$3, tmpCalleeParam$5, undefined);
  return x;
};
let tmpCalleeParam$7 = f();
$(tmpCalleeParam$7);
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) array reads var statement with init CallExpression
- (todo) support IfStatement as statement in let_hoisting noob check
- (todo) support array reads statement type ExpressionStatement
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
