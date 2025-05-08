# Preval test case

# default_yes_no__missing.md

> Normalize > Pattern > Assignment > Obj > Arr > Rest > Default yes no  missing
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
({ x: [...y] = $(['pass']) } = { a: 11, b: 12 });
$(y);
`````


## Settled


`````js filename=intro
let tmpOPAD /*:unknown*/ = undefined;
const tmpOPBD /*:unknown*/ = $Object_prototype.x;
const tmpIfTest /*:boolean*/ = tmpOPBD === undefined;
if (tmpIfTest) {
  const tmpCalleeParam /*:array*/ = [`pass`];
  tmpOPAD = $(tmpCalleeParam);
} else {
  tmpOPAD = tmpOPBD;
}
const tmpArrPatternSplat /*:array*/ = [...tmpOPAD];
y = $dotCall($array_slice, tmpArrPatternSplat, `slice`, 0);
$(y);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let tmpOPAD = undefined;
const tmpOPBD = $Object_prototype.x;
if (tmpOPBD === undefined) {
  tmpOPAD = $([`pass`]);
} else {
  tmpOPAD = tmpOPBD;
}
y = $dotCall($array_slice, [...tmpOPAD], `slice`, 0);
$(y);
`````


## PST Settled
With rename=true

`````js filename=intro
let a = undefined;
const b = $Object_prototype.x;
const c = b === undefined;
if (c) {
  const d = [ "pass" ];
  a = $( d );
}
else {
  a = b;
}
const e = [ ...a ];
y = $dotCall( $array_slice, e, "slice", 0 );
$( y );
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) access object property that also exists on prototype? $array_slice
- (todo) support array reads statement type ExpressionStatement
- (todo) type trackeed tricks can possibly support static $array_slice


## Globals


BAD@! Found 1 implicit global bindings:

y


## Runtime Outcome


Should call `$` with:
 - 1: ['pass']
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
