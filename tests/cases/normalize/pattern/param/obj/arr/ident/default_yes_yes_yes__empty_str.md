# Preval test case

# default_yes_yes_yes__empty_str.md

> Normalize > Pattern > Param > Obj > Arr > Ident > Default yes yes yes  empty str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f({ x: [y = 'fail'] = $(['pass2']) } = $({ x: ['fail3'] })) {
  return y;
}
$(f('', 10));
`````


## Settled


`````js filename=intro
const tmpOPBD /*:unknown*/ = $String_prototype.x;
let tmpOPAD /*:unknown*/ = undefined;
const tmpIfTest$1 /*:boolean*/ = tmpOPBD === undefined;
if (tmpIfTest$1) {
  const tmpCalleeParam$1 /*:array*/ = [`pass2`];
  tmpOPAD = $(tmpCalleeParam$1);
} else {
  tmpOPAD = tmpOPBD;
}
const tmpArrPatternSplat /*:array*/ = [...tmpOPAD];
const tmpAPBD /*:unknown*/ = tmpArrPatternSplat[0];
const tmpIfTest$3 /*:boolean*/ = tmpAPBD === undefined;
if (tmpIfTest$3) {
  $(`fail`);
} else {
  $(tmpAPBD);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpOPBD = $String_prototype.x;
let tmpOPAD = undefined;
if (tmpOPBD === undefined) {
  tmpOPAD = $([`pass2`]);
} else {
  tmpOPAD = tmpOPBD;
}
const tmpAPBD = [...tmpOPAD][0];
if (tmpAPBD === undefined) {
  $(`fail`);
} else {
  $(tmpAPBD);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $String_prototype.x;
let b = undefined;
const c = a === undefined;
if (c) {
  const d = [ "pass2" ];
  b = $( d );
}
else {
  b = a;
}
const e = [ ...b ];
const f = e[ 0 ];
const g = f === undefined;
if (g) {
  $( "fail" );
}
else {
  $( f );
}
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
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
