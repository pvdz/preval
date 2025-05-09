# Preval test case

# default_yes_yes_no__arr_undefined.md

> Normalize > Pattern > Param > Arr > Obj > Ident > Default yes yes no  arr undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f([{ x = $('pass') } = $({ x: 'pass2' })]) {
  return x;
}
$(f([undefined, 20, 30], 200));
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:object*/ = { x: `pass2` };
const tmpArrPatternStep /*:unknown*/ = $(tmpCalleeParam);
const tmpOPBD /*:unknown*/ = tmpArrPatternStep.x;
const tmpIfTest$1 /*:boolean*/ = tmpOPBD === undefined;
if (tmpIfTest$1) {
  const tmpCalleeParam$1 /*:unknown*/ = $(`pass`);
  $(tmpCalleeParam$1);
} else {
  $(tmpOPBD);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpOPBD = $({ x: `pass2` }).x;
if (tmpOPBD === undefined) {
  $($(`pass`));
} else {
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
  const e = $( "pass" );
  $( e );
}
else {
  $( c );
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
 - 1: { x: '"pass2"' }
 - 2: 'pass2'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
