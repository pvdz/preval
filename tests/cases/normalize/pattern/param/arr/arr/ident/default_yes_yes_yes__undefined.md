# Preval test case

# default_yes_yes_yes__undefined.md

> Normalize > Pattern > Param > Arr > Arr > Ident > Default yes yes yes  undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f([[x = $('fail')] = $(['fail2'])] = $(['pass3'])) {
  return x;
}
$(f(undefined, 200));
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:array*/ = [`pass3`];
const tmpBindingPatternArrRoot /*:unknown*/ = $(tmpCalleeParam);
const tmpArrPatternSplat /*:array*/ = [...tmpBindingPatternArrRoot];
const tmpAPBD /*:unknown*/ = tmpArrPatternSplat[0];
let tmpArrPatternStep /*:unknown*/ = undefined;
const tmpIfTest$1 /*:boolean*/ = tmpAPBD === undefined;
if (tmpIfTest$1) {
  const tmpCalleeParam$1 /*:array*/ = [`fail2`];
  tmpArrPatternStep = $(tmpCalleeParam$1);
} else {
  tmpArrPatternStep = tmpAPBD;
}
const tmpArrPatternSplat$1 /*:array*/ = [...tmpArrPatternStep];
const tmpAPBD$1 /*:unknown*/ = tmpArrPatternSplat$1[0];
const tmpIfTest$3 /*:boolean*/ = tmpAPBD$1 === undefined;
if (tmpIfTest$3) {
  const x /*:unknown*/ = $(`fail`);
  $(x);
} else {
  $(tmpAPBD$1);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpBindingPatternArrRoot = $([`pass3`]);
const tmpAPBD = [...tmpBindingPatternArrRoot][0];
let tmpArrPatternStep = undefined;
if (tmpAPBD === undefined) {
  tmpArrPatternStep = $([`fail2`]);
} else {
  tmpArrPatternStep = tmpAPBD;
}
const tmpAPBD$1 = [...tmpArrPatternStep][0];
if (tmpAPBD$1 === undefined) {
  $($(`fail`));
} else {
  $(tmpAPBD$1);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ "pass3" ];
const b = $( a );
const c = [ ...b ];
const d = c[ 0 ];
let e = undefined;
const f = d === undefined;
if (f) {
  const g = [ "fail2" ];
  e = $( g );
}
else {
  e = d;
}
const h = [ ...e ];
const i = h[ 0 ];
const j = i === undefined;
if (j) {
  const k = $( "fail" );
  $( k );
}
else {
  $( i );
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
 - 1: ['pass3']
 - 2: 'p'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
