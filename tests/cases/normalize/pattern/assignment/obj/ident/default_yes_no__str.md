# Preval test case

# default_yes_no__str.md

> Normalize > Pattern > Assignment > Obj > Ident > Default yes no  str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
({ x = $('pass') } = 'abc');
$(x);
`````

## Settled


`````js filename=intro
const objPatternBeforeDefault /*:unknown*/ = `abc`.x;
const tmpIfTest /*:boolean*/ = objPatternBeforeDefault === undefined;
if (tmpIfTest) {
  x = $(`pass`);
  $(x);
} else {
  x = objPatternBeforeDefault;
  $(x);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const objPatternBeforeDefault = `abc`.x;
if (objPatternBeforeDefault === undefined) {
  x = $(`pass`);
  $(x);
} else {
  x = objPatternBeforeDefault;
  $(x);
}
`````

## Pre Normal


`````js filename=intro
({ x: x = $(`pass`) } = `abc`);
$(x);
`````

## Normalized


`````js filename=intro
const tmpAssignObjPatternRhs = `abc`;
const objPatternBeforeDefault = tmpAssignObjPatternRhs.x;
const tmpIfTest = objPatternBeforeDefault === undefined;
if (tmpIfTest) {
  x = $(`pass`);
} else {
  x = objPatternBeforeDefault;
}
$(x);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = "abc".x;
const b = a === undefined;
if (b) {
  x = $( "pass" );
  $( x );
}
else {
  x = a;
  $( x );
}
`````

## Globals

BAD@! Found 1 implicit global bindings:

x

## Runtime Outcome

Should call `$` with:
 - 1: 'pass'
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
