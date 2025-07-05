# Preval test case

# default_yes_no__missing.md

> Normalize > Pattern > Param > Obj > Arr > Rest > Default yes no  missing
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f({ x: [...y] = $(['pass']) }) {
  return y;
}
$(f({ a: 11, b: 12 }, 10));
`````


## Settled


`````js filename=intro
const tmpOPBD /*:unknown*/ = $Object_prototype.x;
let tmpOPAD /*:unknown*/ /*ternaryConst*/ = undefined;
const tmpIfTest /*:boolean*/ = tmpOPBD === undefined;
if (tmpIfTest) {
  const tmpCalleeParam /*:array*/ /*truthy*/ = [`pass`];
  tmpOPAD = $(tmpCalleeParam);
} else {
  tmpOPAD = tmpOPBD;
}
const tmpArrPatternSplat /*:array*/ /*truthy*/ = [...tmpOPAD];
const y /*:array*/ /*truthy*/ = $dotCall($array_slice, tmpArrPatternSplat, `slice`, 0);
$(y);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpOPBD = $Object_prototype.x;
let tmpOPAD = undefined;
if (tmpOPBD === undefined) {
  tmpOPAD = $([`pass`]);
} else {
  tmpOPAD = tmpOPBD;
}
$($dotCall($array_slice, [...tmpOPAD], `slice`, 0));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $Object_prototype.x;
let b = undefined;
const c = a === undefined;
if (c) {
  const d = [ "pass" ];
  b = $( d );
}
else {
  b = a;
}
const e = [ ...b ];
const f = $dotCall( $array_slice, e, "slice", 0 );
$( f );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let tmpBindingPatternObjRoot = tmpParamBare;
  let tmpOPBD = tmpBindingPatternObjRoot.x;
  let tmpOPAD = undefined;
  const tmpIfTest = tmpOPBD === undefined;
  if (tmpIfTest) {
    let tmpCalleeParam = [`pass`];
    tmpOPAD = $(tmpCalleeParam);
  } else {
    tmpOPAD = tmpOPBD;
  }
  let tmpArrPatternSplat = [...tmpOPAD];
  const tmpMCF = tmpArrPatternSplat.slice;
  let y = $dotCall(tmpMCF, tmpArrPatternSplat, `slice`, 0);
  return y;
};
const tmpCallCallee = f;
let tmpCalleeParam$3 = { a: 11, b: 12 };
let tmpCalleeParam$1 = f(tmpCalleeParam$3, 10);
$(tmpCalleeParam$1);
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) access object property that also exists on prototype? $array_slice
- (todo) support Identifier as var init in let_hoisting noob check
- (todo) support array reads statement type ExpressionStatement
- (todo) type trackeed tricks can possibly support static $array_slice


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: ['pass']
 - 2: ['pass']
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
