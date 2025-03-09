# Preval test case

# default_yes_no_no__obj_obj_missing.md

> Normalize > Pattern > Assignment > Obj > Obj > Ident > Default yes no no  obj obj missing
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
({ x: { y = $('pass') } } = { x: { x: 1, z: 3 }, b: 11, c: 12 });
$(y);
`````

## Settled


`````js filename=intro
const objPatternBeforeDefault /*:unknown*/ = $Object_prototype.y;
const tmpIfTest /*:boolean*/ = objPatternBeforeDefault === undefined;
if (tmpIfTest) {
  y = $(`pass`);
  $(y);
} else {
  y = objPatternBeforeDefault;
  $(objPatternBeforeDefault);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const objPatternBeforeDefault = $Object_prototype.y;
if (objPatternBeforeDefault === undefined) {
  y = $(`pass`);
  $(y);
} else {
  y = objPatternBeforeDefault;
  $(objPatternBeforeDefault);
}
`````

## Pre Normal


`````js filename=intro
({
  x: { y: y = $(`pass`) },
} = { x: { x: 1, z: 3 }, b: 11, c: 12 });
$(y);
`````

## Normalized


`````js filename=intro
const tmpObjLitVal = { x: 1, z: 3 };
const tmpAssignObjPatternRhs = { x: tmpObjLitVal, b: 11, c: 12 };
const objPatternNoDefault = tmpAssignObjPatternRhs.x;
const objPatternBeforeDefault = objPatternNoDefault.y;
const tmpIfTest = objPatternBeforeDefault === undefined;
if (tmpIfTest) {
  y = $(`pass`);
  $(y);
} else {
  y = objPatternBeforeDefault;
  $(objPatternBeforeDefault);
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
