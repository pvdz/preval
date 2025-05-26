# Preval test case

# default_yes_yes__arr_elided.md

> Normalize > Pattern > Param > Arr > Arr > Default yes yes  arr elided
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f([[] = $(['pass2'])] = $(['fail3'])) {
  return 'ok';
}
$(f([, , , , 4, 5], 200));
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:array*/ = [`pass2`];
const tmpSSA_tmpArrPatternStep /*:unknown*/ = $(tmpCalleeParam$1);
[...tmpSSA_tmpArrPatternStep];
$(`ok`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpSSA_tmpArrPatternStep = $([`pass2`]);
[...tmpSSA_tmpArrPatternStep];
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
  let tmpBindingPatternArrRoot = undefined;
  const tmpIfTest = tmpParamBare === undefined;
  if (tmpIfTest) {
    let tmpCalleeParam = [`fail3`];
    tmpBindingPatternArrRoot = $(tmpCalleeParam);
  } else {
    tmpBindingPatternArrRoot = tmpParamBare;
  }
  let tmpArrPatternSplat = [...tmpBindingPatternArrRoot];
  let tmpAPBD = tmpArrPatternSplat[0];
  let tmpArrPatternStep = undefined;
  const tmpIfTest$1 = tmpAPBD === undefined;
  if (tmpIfTest$1) {
    let tmpCalleeParam$1 = [`pass2`];
    tmpArrPatternStep = $(tmpCalleeParam$1);
  } else {
    tmpArrPatternStep = tmpAPBD;
  }
  let tmpArrPatternSplat$1 = [...tmpArrPatternStep];
  return `ok`;
};
const tmpCallCallee = f;
let tmpCalleeParam$5 = [, , , , 4, 5];
let tmpCalleeParam$3 = f(tmpCalleeParam$5, 200);
$(tmpCalleeParam$3);
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
 - 2: 'ok'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
