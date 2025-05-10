# Preval test case

# default_yes_no__obj_empty2.md

> Normalize > Pattern > Param > Obj > Obj > Rest > Default yes no  obj empty2
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
let tmpCalleeParam$1 /*:unknown*/ = undefined;
const tmpOPBD /*:unknown*/ = $Object_prototype.x;
const tmpIfTest /*:boolean*/ = tmpOPBD === undefined;
if (tmpIfTest) {
  const tmpCalleeParam /*:object*/ = { a: `pass` };
  const tmpClusterSSA_tmpOPAD /*:unknown*/ = $(tmpCalleeParam);
  tmpCalleeParam$1 = tmpClusterSSA_tmpOPAD;
} else {
  tmpCalleeParam$1 = tmpOPBD;
}
const tmpCalleeParam$3 /*:array*/ = [];
const y /*:unknown*/ = $objPatternRest(tmpCalleeParam$1, tmpCalleeParam$3, undefined);
$(y);
`````


## Settled


`````js filename=intro
let tmpCalleeParam$1 /*:unknown*/ = undefined;
const tmpOPBD /*:unknown*/ = $Object_prototype.x;
const tmpIfTest /*:boolean*/ = tmpOPBD === undefined;
if (tmpIfTest) {
  const tmpCalleeParam /*:object*/ = { a: `pass` };
  tmpCalleeParam$1 = $(tmpCalleeParam);
} else {
  tmpCalleeParam$1 = tmpOPBD;
}
const tmpCalleeParam$3 /*:array*/ = [];
const y /*:unknown*/ = $objPatternRest(tmpCalleeParam$1, tmpCalleeParam$3, undefined);
$(y);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let tmpCalleeParam$1 = undefined;
const tmpOPBD = $Object_prototype.x;
if (tmpOPBD === undefined) {
  tmpCalleeParam$1 = $({ a: `pass` });
} else {
  tmpCalleeParam$1 = tmpOPBD;
}
$($objPatternRest(tmpCalleeParam$1, [], undefined));
`````


## PST Settled
With rename=true

`````js filename=intro
let a = undefined;
const b = $Object_prototype.x;
const c = b === undefined;
if (c) {
  const d = { a: "pass" };
  a = $( d );
}
else {
  a = b;
}
const e = [];
const f = $objPatternRest( a, e, undefined );
$( f );
`````


## Todos triggered


- (todo) support array reads statement type VarStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { a: '"pass"' }
 - 2: { a: '"pass"' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
