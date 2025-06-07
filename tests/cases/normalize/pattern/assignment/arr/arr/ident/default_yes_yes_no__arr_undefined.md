# Preval test case

# default_yes_yes_no__arr_undefined.md

> Normalize > Pattern > Assignment > Arr > Arr > Ident > Default yes yes no  arr undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
([[x = $('fail')] = $(['pass2'])] = [undefined, 4, 5]);
$(x);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:array*/ = [`pass2`];
const tmpClusterSSA_tmpArrPatternStep /*:unknown*/ = $(tmpCalleeParam);
const tmpArrPatternSplat$1 /*:array*/ = [...tmpClusterSSA_tmpArrPatternStep];
const tmpAPBD$1 /*:unknown*/ = tmpArrPatternSplat$1[0];
const tmpIfTest$1 /*:boolean*/ = tmpAPBD$1 === undefined;
if (tmpIfTest$1) {
  x = $(`fail`);
  $(x);
} else {
  x = tmpAPBD$1;
  $(tmpAPBD$1);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpClusterSSA_tmpArrPatternStep = $([`pass2`]);
const tmpAPBD$1 = [...tmpClusterSSA_tmpArrPatternStep][0];
if (tmpAPBD$1 === undefined) {
  x = $(`fail`);
  $(x);
} else {
  x = tmpAPBD$1;
  $(tmpAPBD$1);
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
  x = $( "fail" );
  $( x );
}
else {
  x = d;
  $( d );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpArrAssignPatternRhs = [undefined, 4, 5];
const tmpArrPatternSplat = [...tmpArrAssignPatternRhs];
const tmpAPBD = tmpArrPatternSplat[0];
let tmpArrPatternStep = undefined;
const tmpIfTest = tmpAPBD === undefined;
if (tmpIfTest) {
  let tmpCalleeParam = [`pass2`];
  tmpArrPatternStep = $(tmpCalleeParam);
} else {
  tmpArrPatternStep = tmpAPBD;
}
const tmpArrPatternSplat$1 = [...tmpArrPatternStep];
const tmpAPBD$1 = tmpArrPatternSplat$1[0];
const tmpIfTest$1 = tmpAPBD$1 === undefined;
if (tmpIfTest$1) {
  x = $(`fail`);
  $(x);
} else {
  x = tmpAPBD$1;
  $(tmpAPBD$1);
}
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) support array reads statement type ExpressionStatement
- (todo) support array reads statement type VarStatement
- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


## Globals


BAD@! Found 1 implicit global bindings:

x


## Runtime Outcome


Should call `$` with:
 - 1: ['pass2']
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
