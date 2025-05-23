# Preval test case

# default_yes_yes_no__obj_obj_missing.md

> Normalize > Pattern > Assignment > Obj > Obj > Ident > Default yes yes no  obj obj missing
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
({ x: { y = $('pass') } = $({ y: 'fail2' }) } = { x: { x: 1, z: 3 }, b: 11, c: 12 });
$(y);
`````


## Settled


`````js filename=intro
const tmpOPBD$1 /*:unknown*/ = $Object_prototype.y;
const tmpIfTest$1 /*:boolean*/ = tmpOPBD$1 === undefined;
if (tmpIfTest$1) {
  y = $(`pass`);
  $(y);
} else {
  y = tmpOPBD$1;
  $(tmpOPBD$1);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpOPBD$1 = $Object_prototype.y;
if (tmpOPBD$1 === undefined) {
  y = $(`pass`);
  $(y);
} else {
  y = tmpOPBD$1;
  $(tmpOPBD$1);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $Object_prototype.y;
const b = a === undefined;
if (b) {
  y = $( "pass" );
  $( y );
}
else {
  y = a;
  $( a );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpObjLitVal = { x: 1, z: 3 };
const tmpAssignObjPatternRhs = { x: tmpObjLitVal, b: 11, c: 12 };
const tmpOPBD = tmpAssignObjPatternRhs.x;
let tmpOPAD = undefined;
const tmpIfTest = tmpOPBD === undefined;
if (tmpIfTest) {
  let tmpCalleeParam = { y: `fail2` };
  tmpOPAD = $(tmpCalleeParam);
} else {
  tmpOPAD = tmpOPBD;
}
const tmpOPBD$1 = tmpOPAD.y;
const tmpIfTest$1 = tmpOPBD$1 === undefined;
if (tmpIfTest$1) {
  y = $(`pass`);
  $(y);
} else {
  y = tmpOPBD$1;
  $(tmpOPBD$1);
}
`````


## Todos triggered


None


## Globals


BAD@! Found 1 implicit global bindings:

y


## Runtime Outcome


Should call `$` with:
 - 1: 'pass'
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
