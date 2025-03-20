# Preval test case

# default_yes_yes_no__obj_obj_empty.md

> Normalize > Pattern > Assignment > Obj > Obj > Ident > Default yes yes no  obj obj empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
({ x: { y = $('pass') } = $({ y: 'fail2' }) } = { x: {}, b: 11, c: 12 });
$(y);
`````


## Settled


`````js filename=intro
const objPatternBeforeDefault$1 /*:unknown*/ = $Object_prototype.y;
const tmpIfTest$1 /*:boolean*/ = objPatternBeforeDefault$1 === undefined;
if (tmpIfTest$1) {
  y = $(`pass`);
  $(y);
} else {
  y = objPatternBeforeDefault$1;
  $(objPatternBeforeDefault$1);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const objPatternBeforeDefault$1 = $Object_prototype.y;
if (objPatternBeforeDefault$1 === undefined) {
  y = $(`pass`);
  $(y);
} else {
  y = objPatternBeforeDefault$1;
  $(objPatternBeforeDefault$1);
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
