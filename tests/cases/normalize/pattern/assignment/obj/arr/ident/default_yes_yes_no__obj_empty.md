# Preval test case

# default_yes_yes_no__obj_empty.md

> Normalize > Pattern > Assignment > Obj > Arr > Ident > Default yes yes no  obj empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
({ x: [y = 'fail'] = $(['pass2']) } = {});
$(y);
`````


## Settled


`````js filename=intro
const tmpOPBD /*:unknown*/ = $Object_prototype.x;
let tmpOPAD /*:unknown*/ /*ternaryConst*/ = undefined;
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
  y = `fail`;
  $(y);
} else {
  y = tmpAPBD;
  $(tmpAPBD);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpOPBD = $Object_prototype.x;
let tmpOPAD = undefined;
if (tmpOPBD === undefined) {
  tmpOPAD = $([`pass2`]);
} else {
  tmpOPAD = tmpOPBD;
}
const tmpAPBD = [...tmpOPAD][0];
if (tmpAPBD === undefined) {
  y = `fail`;
  $(y);
} else {
  y = tmpAPBD;
  $(tmpAPBD);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $Object_prototype.x;
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
  y = "fail";
  $( y );
}
else {
  y = f;
  $( f );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpAssignObjPatternRhs = {};
const tmpOPBD = tmpAssignObjPatternRhs.x;
let tmpOPAD = undefined;
const tmpIfTest = tmpOPBD === undefined;
if (tmpIfTest) {
  let tmpCalleeParam = [`pass2`];
  tmpOPAD = $(tmpCalleeParam);
} else {
  tmpOPAD = tmpOPBD;
}
const tmpArrPatternSplat = [...tmpOPAD];
const tmpAPBD = tmpArrPatternSplat[0];
const tmpIfTest$1 = tmpAPBD === undefined;
if (tmpIfTest$1) {
  y = `fail`;
  $(y);
} else {
  y = tmpAPBD;
  $(tmpAPBD);
}
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) support array reads statement type ExpressionStatement
- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


## Globals


BAD@! Found 1 implicit global bindings:

y


## Runtime Outcome


Should call `$` with:
 - 1: ['pass2']
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
