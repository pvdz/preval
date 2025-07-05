# Preval test case

# default_yes_no__empty_str.md

> Normalize > Pattern > Param > Arr > Arr > Default yes no  empty str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f([[] = $(['pass2'])]) {
  return 'ok';
}
$(f('', 200));
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:array*/ /*truthy*/ = [`pass2`];
const tmpClusterSSA_tmpArrPatternStep /*:unknown*/ = $(tmpCalleeParam);
[...tmpClusterSSA_tmpArrPatternStep];
$(`ok`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpClusterSSA_tmpArrPatternStep = $([`pass2`]);
[...tmpClusterSSA_tmpArrPatternStep];
$(`ok`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ "pass2" ];
const b = $( a );
[ ...b ];
$( "ok" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let tmpBindingPatternArrRoot = tmpParamBare;
  let tmpArrPatternSplat = [...tmpBindingPatternArrRoot];
  let tmpAPBD = tmpArrPatternSplat[0];
  let tmpArrPatternStep = undefined;
  const tmpIfTest = tmpAPBD === undefined;
  if (tmpIfTest) {
    let tmpCalleeParam = [`pass2`];
    tmpArrPatternStep = $(tmpCalleeParam);
  } else {
    tmpArrPatternStep = tmpAPBD;
  }
  let tmpArrPatternSplat$1 = [...tmpArrPatternStep];
  return `ok`;
};
let tmpCalleeParam$1 = f(``, 200);
$(tmpCalleeParam$1);
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) array reads var statement with init CallExpression
- (todo) support Identifier as var init in let_hoisting noob check
- (todo) support array reads statement type ExpressionStatement
- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: ['pass2']
 - 2: 'ok'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
