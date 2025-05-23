# Preval test case

# default_yes_no__arr_empty_str.md

> Normalize > Pattern > Binding > Arr > Arr > Rest > Default yes no  arr empty str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
const [[...x] = $('fail')] = ['', 4, 5];
$(x);
`````


## Settled


`````js filename=intro
const x /*:array*/ = [];
$(x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$([]);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [];
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpBindingPatternArrRoot = [``, 4, 5];
const tmpArrPatternSplat = [...tmpBindingPatternArrRoot];
const tmpAPBD = tmpArrPatternSplat[0];
let tmpArrPatternStep = undefined;
const tmpIfTest = tmpAPBD === undefined;
if (tmpIfTest) {
  tmpArrPatternStep = $(`fail`);
} else {
  tmpArrPatternStep = tmpAPBD;
}
const tmpArrPatternSplat$1 = [...tmpArrPatternStep];
const tmpMCF = tmpArrPatternSplat$1.slice;
const x = $dotCall(tmpMCF, tmpArrPatternSplat$1, `slice`, 0);
$(x);
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) access object property that also exists on prototype? $array_slice
- (todo) support array reads statement type ExpressionStatement
- (todo) type trackeed tricks can possibly support static $array_slice
- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: []
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
