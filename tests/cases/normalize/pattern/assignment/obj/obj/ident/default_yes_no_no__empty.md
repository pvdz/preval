# Preval test case

# default_yes_no_no__empty.md

> Normalize > Pattern > Assignment > Obj > Obj > Ident > Default yes no no  empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
({ x: { y = $('fail') } } = 1);
$('bad');
`````

## Settled


`````js filename=intro
const objPatternNoDefault /*:unknown*/ = (1).x;
const objPatternBeforeDefault /*:unknown*/ = objPatternNoDefault.y;
const tmpIfTest /*:boolean*/ = objPatternBeforeDefault === undefined;
if (tmpIfTest) {
  y = $(`fail`);
  $(`bad`);
} else {
  y = objPatternBeforeDefault;
  $(`bad`);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const objPatternBeforeDefault = (1).x.y;
if (objPatternBeforeDefault === undefined) {
  y = $(`fail`);
  $(`bad`);
} else {
  y = objPatternBeforeDefault;
  $(`bad`);
}
`````

## Pre Normal


`````js filename=intro
({
  x: { y: y = $(`fail`) },
} = 1);
$(`bad`);
`````

## Normalized


`````js filename=intro
const tmpAssignObjPatternRhs = 1;
const objPatternNoDefault = tmpAssignObjPatternRhs.x;
const objPatternBeforeDefault = objPatternNoDefault.y;
const tmpIfTest = objPatternBeforeDefault === undefined;
if (tmpIfTest) {
  y = $(`fail`);
  $(`bad`);
} else {
  y = objPatternBeforeDefault;
  $(`bad`);
}
`````

## PST Settled
With rename=true

`````js filename=intro
const a = 1.x;
const b = a.y;
const c = b === undefined;
if (c) {
  y = $( "fail" );
  $( "bad" );
}
else {
  y = b;
  $( "bad" );
}
`````

## Globals

BAD@! Found 1 implicit global bindings:

y

## Runtime Outcome

Should call `$` with:
 - eval returned: ('<crash[ Cannot read property <ref> of <ref2> ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
