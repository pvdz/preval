# Preval test case

# default_yes_yes_no__arr_elided.md

> Normalize > Pattern > Assignment > Arr > Obj > Ident > Default yes yes no  arr elided
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
([{ x = $('pass') } = $({ x: 'pass2' })] = [, , , 1, 20, 30]);
$(x);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:object*/ = { x: `pass2` };
const tmpSSA_tmpArrPatternStep /*:unknown*/ = $(tmpCalleeParam);
const tmpOPBD /*:unknown*/ = tmpSSA_tmpArrPatternStep.x;
const tmpIfTest$1 /*:boolean*/ = tmpOPBD === undefined;
if (tmpIfTest$1) {
  x = $(`pass`);
  $(x);
} else {
  x = tmpOPBD;
  $(tmpOPBD);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpOPBD = $({ x: `pass2` }).x;
if (tmpOPBD === undefined) {
  x = $(`pass`);
  $(x);
} else {
  x = tmpOPBD;
  $(tmpOPBD);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { x: "pass2" };
const b = $( a );
const c = b.x;
const d = c === undefined;
if (d) {
  x = $( "pass" );
  $( x );
}
else {
  x = c;
  $( c );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpArrAssignPatternRhs = [, , , 1, 20, 30];
const tmpArrPatternSplat = [...tmpArrAssignPatternRhs];
const tmpAPBD = tmpArrPatternSplat[0];
let tmpArrPatternStep = undefined;
const tmpIfTest = tmpAPBD === undefined;
if (tmpIfTest) {
  let tmpCalleeParam = { x: `pass2` };
  tmpArrPatternStep = $(tmpCalleeParam);
} else {
  tmpArrPatternStep = tmpAPBD;
}
const tmpOPBD = tmpArrPatternStep.x;
const tmpIfTest$1 = tmpOPBD === undefined;
if (tmpIfTest$1) {
  x = $(`pass`);
  $(x);
} else {
  x = tmpOPBD;
  $(tmpOPBD);
}
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


## Globals


BAD@! Found 1 implicit global bindings:

x


## Runtime Outcome


Should call `$` with:
 - 1: { x: '"pass2"' }
 - eval returned: ('<crash[ Cannot set property x of #<Object> which has only a getter ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
