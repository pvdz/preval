# Preval test case

# default_yes_yes_no__obj_missing.md

> Normalize > Pattern > Param > Obj > Arr > Ident > Default yes yes no  obj missing
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f({ x: [y = 'fail'] = $(['pass2']) }) {
  return y;
}
$(f({ a: 11, b: 12 }, 10));
`````


## Settled


`````js filename=intro
let tmpOPAD /*:unknown*/ = undefined;
const tmpOPBD /*:unknown*/ = $Object_prototype.x;
const tmpIfTest /*:boolean*/ = tmpOPBD === undefined;
if (tmpIfTest) {
  const tmpCalleeParam /*:array*/ = [`pass2`];
  tmpOPAD = $(tmpCalleeParam);
} else {
  tmpOPAD = tmpOPBD;
}
const tmpArrPatternSplat /*:array*/ = [...tmpOPAD];
const tmpAPBD /*:unknown*/ = tmpArrPatternSplat[0];
const tmpIfTest$1 /*:boolean*/ = tmpAPBD === undefined;
if (tmpIfTest$1) {
  $(`fail`);
} else {
  $(tmpAPBD);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let tmpOPAD = undefined;
const tmpOPBD = $Object_prototype.x;
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
let a = undefined;
const b = $Object_prototype.x;
const c = b === undefined;
if (c) {
  const d = [ "pass2" ];
  a = $( d );
}
else {
  a = b;
}
const e = [ ...a ];
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
- (todo) support array reads statement type ExpressionStatement
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
