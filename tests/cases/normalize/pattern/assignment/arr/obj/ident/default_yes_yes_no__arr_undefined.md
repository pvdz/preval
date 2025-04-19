# Preval test case

# default_yes_yes_no__arr_undefined.md

> Normalize > Pattern > Assignment > Arr > Obj > Ident > Default yes yes no  arr undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
([{ x = $('pass') } = $({ x: 'pass2' })] = [undefined, 20, 30]);
$(x);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:object*/ = { x: `pass2` };
const tmpArrPatternStep /*:unknown*/ = $(tmpCalleeParam);
const tmpOPBD /*:unknown*/ = tmpArrPatternStep.x;
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


## Todos triggered


- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope
- (todo) Deal with array spreads in arr mutation?


## Globals


BAD@! Found 1 implicit global bindings:

x


## Runtime Outcome


Should call `$` with:
 - 1: { x: '"pass2"' }
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
