# Preval test case

# default_yes_yes_no__obj_undefined.md

> Normalize > Pattern > Assignment > Obj > Arr > Ident > Default yes yes no  obj undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
({ x: [y = 'fail'] = $(['pass2']) } = { x: undefined, a: 11, b: 12 });
$('bad');
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:array*/ = [`pass2`];
const tmpOPAD /*:unknown*/ = $(tmpCalleeParam);
const tmpArrPatternSplat /*:array*/ = [...tmpOPAD];
const tmpAPBD /*:unknown*/ = tmpArrPatternSplat[0];
const tmpIfTest$1 /*:boolean*/ = tmpAPBD === undefined;
if (tmpIfTest$1) {
  y = `fail`;
  $(`bad`);
} else {
  y = tmpAPBD;
  $(`bad`);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpOPAD = $([`pass2`]);
const tmpAPBD = [...tmpOPAD][0];
if (tmpAPBD === undefined) {
  y = `fail`;
  $(`bad`);
} else {
  y = tmpAPBD;
  $(`bad`);
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
  y = "fail";
  $( "bad" );
}
else {
  y = d;
  $( "bad" );
}
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) support array reads statement type ExpressionStatement
- (todo) support array reads statement type VarStatement
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
