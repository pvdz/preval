# Preval test case

# default_yes_yes__undefined.md

> Normalize > Pattern > Param > Arr > Arr > Default yes yes  undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f([[] = $(['fail2'])] = $(['pass3'])) {
  return 'ok';
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
[...tmpArrPatternStep];
$(`ok`);
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
[...tmpArrPatternStep];
$(`ok`);
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
[ ...e ];
$( "ok" );
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope
- (todo) support array reads statement type VarStatement
- (todo) support array reads statement type ExpressionStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: ['pass3']
 - 2: 'ok'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
