# Preval test case

# default_yes_yes_yes__arr_empty.md

> Normalize > Pattern > Param > Arr > Arr > Ident > Default yes yes yes  arr empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f([[x = $('fail')] = $(['pass2'])] = $(['fail3'])) {
  return x;
}
$(f([], 200));
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:array*/ = [`pass2`];
const tmpArrPatternStep /*:unknown*/ = $(tmpCalleeParam$1);
const tmpArrPatternSplat$1 /*:array*/ = [...tmpArrPatternStep];
const tmpAPBD$1 /*:unknown*/ = tmpArrPatternSplat$1[0];
const tmpIfTest$3 /*:boolean*/ = tmpAPBD$1 === undefined;
if (tmpIfTest$3) {
  const tmpCalleeParam$3 /*:unknown*/ = $(`fail`);
  $(tmpCalleeParam$3);
} else {
  $(tmpAPBD$1);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpArrPatternStep = $([`pass2`]);
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
const a = [ "pass2" ];
const b = $( a );
const c = [ ...b ];
const d = c[ 0 ];
const e = d === undefined;
if (e) {
  const f = $( "fail" );
  $( f );
}
else {
  $( d );
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
 - 1: ['pass2']
 - 2: 'pass2'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
