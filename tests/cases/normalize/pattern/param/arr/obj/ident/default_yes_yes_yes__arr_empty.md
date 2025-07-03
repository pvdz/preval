# Preval test case

# default_yes_yes_yes__arr_empty.md

> Normalize > Pattern > Param > Arr > Obj > Ident > Default yes yes yes  arr empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f([{ x = $('pass') } = $({ x: 'pass2' })] = $([{ x: 'fail3' }])) {
  return x;
}
$(f([], 200));
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:object*/ /*truthy*/ = { x: `pass2` };
const tmpSSA_tmpArrPatternStep /*:unknown*/ = $(tmpCalleeParam$1);
const tmpOPBD /*:unknown*/ = tmpSSA_tmpArrPatternStep.x;
const tmpIfTest$3 /*:boolean*/ = tmpOPBD === undefined;
if (tmpIfTest$3) {
  const tmpClusterSSA_tmpCalleeParam$3 /*:unknown*/ = $(`pass`);
  $(tmpClusterSSA_tmpCalleeParam$3);
} else {
  $(tmpOPBD);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpOPBD = $({ x: `pass2` }).x;
if (tmpOPBD === undefined) {
  $($(`pass`));
} else {
  $(tmpOPBD);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { x: "pass2" };
const b = $( a );
const c = b.x;
const d = c === undefined;
if (d) {
  const e = $( "pass" );
  $( e );
}
else {
  $( c );
}
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
    const tmpArrElement = { x: `fail3` };
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
    let tmpCalleeParam$1 = { x: `pass2` };
    tmpArrPatternStep = $(tmpCalleeParam$1);
  } else {
    tmpArrPatternStep = tmpAPBD;
  }
  let tmpOPBD = tmpArrPatternStep.x;
  let x = undefined;
  const tmpIfTest$3 = tmpOPBD === undefined;
  if (tmpIfTest$3) {
    x = $(`pass`);
    return x;
  } else {
    x = tmpOPBD;
    return x;
  }
};
const tmpCallCallee = f;
let tmpCalleeParam$5 = [];
let tmpCalleeParam$3 = f(tmpCalleeParam$5, 200);
$(tmpCalleeParam$3);
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) array reads var statement with init ArrayExpression
- (todo) array reads var statement with init CallExpression
- (todo) fixme: spyless vars and labeled nodes
- (todo) support array reads statement type ExpressionStatement
- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { x: '"pass2"' }
 - 2: 'pass2'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
