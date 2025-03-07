# Preval test case

# default_yes_no_no__obj_0.md

> Normalize > Pattern > Assignment > Obj > Obj > Ident > Default yes no no  obj 0
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
({ x: { y = $('pass') } } = { x: 0, b: 11, c: 12 });
$(y);
`````

## Settled


`````js filename=intro
const objPatternBeforeDefault /*:unknown*/ = (0).y;
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
const objPatternBeforeDefault = (0).y;
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
} = { x: 0, b: 11, c: 12 });
$(y);
`````

## Normalized


`````js filename=intro
const tmpAssignObjPatternRhs = { x: 0, b: 11, c: 12 };
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
const a = 0.y;
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
