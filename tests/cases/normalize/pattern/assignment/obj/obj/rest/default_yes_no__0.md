# Preval test case

# default_yes_no__0.md

> Normalize > Pattern > Assignment > Obj > Obj > Rest > Default yes no  0
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Options

- globals: y

## Input

`````js filename=intro
({ x: { ...y } = $({ a: 'pass' }) } = 0);
$(y);
`````


## Settled


`````js filename=intro
const tmpOPBD /*:unknown*/ = $Number_prototype.x;
let tmpCalleeParam$1 /*:unknown*/ /*ternaryConst*/ = undefined;
const tmpIfTest /*:boolean*/ = tmpOPBD === undefined;
if (tmpIfTest) {
  const tmpCalleeParam /*:object*/ /*truthy*/ = { a: `pass` };
  tmpCalleeParam$1 = $(tmpCalleeParam);
} else {
  tmpCalleeParam$1 = tmpOPBD;
}
const tmpCalleeParam$3 /*:array*/ /*truthy*/ = [];
y = $objPatternRest(tmpCalleeParam$1, tmpCalleeParam$3, undefined);
$(y);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpOPBD = $Number_prototype.x;
let tmpCalleeParam$1 = undefined;
if (tmpOPBD === undefined) {
  tmpCalleeParam$1 = $({ a: `pass` });
} else {
  tmpCalleeParam$1 = tmpOPBD;
}
y = $objPatternRest(tmpCalleeParam$1, [], undefined);
$(y);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $Number_prototype.x;
let b = undefined;
const c = a === undefined;
if (c) {
  const d = { a: "pass" };
  b = $( d );
}
else {
  b = a;
}
const e = [];
y = $objPatternRest( b, e, undefined );
$( y );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpAssignObjPatternRhs = 0;
const tmpOPBD = tmpAssignObjPatternRhs.x;
let tmpOPAD = undefined;
const tmpIfTest = tmpOPBD === undefined;
if (tmpIfTest) {
  let tmpCalleeParam = { a: `pass` };
  tmpOPAD = $(tmpCalleeParam);
} else {
  tmpOPAD = tmpOPBD;
}
let tmpCalleeParam$1 = tmpOPAD;
let tmpCalleeParam$3 = [];
y = $objPatternRest(tmpCalleeParam$1, tmpCalleeParam$3, undefined);
$(y);
`````


## Todos triggered


- (todo) support array reads statement type ExpressionStatement


## Globals


None (except for the 1 globals expected by the test)


## Runtime Outcome


Should call `$` with:
 - 1: { a: '"pass"' }
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
