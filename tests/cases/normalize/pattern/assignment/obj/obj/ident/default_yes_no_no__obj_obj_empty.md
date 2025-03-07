# Preval test case

# default_yes_no_no__obj_obj_empty.md

> Normalize > Pattern > Assignment > Obj > Obj > Ident > Default yes no no  obj obj empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
({ x: { y = $('pass') } } = { x: {}, b: 11, c: 12 });
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
  $(y);
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
  $(y);
}
`````

## Pre Normal


`````js filename=intro
({
  x: { y: y = $(`pass`) },
} = { x: {}, b: 11, c: 12 });
$(y);
`````

## Normalized


`````js filename=intro
const tmpObjLitVal = {};
const tmpAssignObjPatternRhs = { x: tmpObjLitVal, b: 11, c: 12 };
const objPatternNoDefault = tmpAssignObjPatternRhs.x;
const objPatternBeforeDefault = objPatternNoDefault.y;
const tmpIfTest = objPatternBeforeDefault === undefined;
if (tmpIfTest) {
  y = $(`pass`);
} else {
  y = objPatternBeforeDefault;
}
$(y);
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
  $( y );
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
