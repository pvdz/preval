# Preval test case

# default_yes_yes_no__arr_empty_str.md

> Normalize > Pattern > Binding > Arr > Arr > Ident > Default yes yes no  arr empty str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
const [[x = $('pass')] = $(['fail2'])] = ['', 4, 5];
$(x);
`````


## Settled


`````js filename=intro
const tmpClusterSSA_x /*:unknown*/ = $(`pass`);
$(tmpClusterSSA_x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(`pass`));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "pass" );
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
  let tmpCalleeParam = [`fail2`];
  tmpArrPatternStep = $(tmpCalleeParam);
} else {
  tmpArrPatternStep = tmpAPBD;
}
const tmpArrPatternSplat$1 = [...tmpArrPatternStep];
const tmpAPBD$1 = tmpArrPatternSplat$1[0];
let x = undefined;
const tmpIfTest$1 = tmpAPBD$1 === undefined;
if (tmpIfTest$1) {
  x = $(`pass`);
  $(x);
} else {
  x = tmpAPBD$1;
  $(tmpAPBD$1);
}
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) support array reads statement type ExpressionStatement
- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'pass'
 - 2: 'pass'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
