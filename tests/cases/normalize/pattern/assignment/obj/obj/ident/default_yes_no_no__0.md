# Preval test case

# default_yes_no_no__0.md

> Normalize > Pattern > Assignment > Obj > Obj > Ident > Default yes no no  0
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
({ x: { y = $('fail') } } = 0);
$('bad');
`````

## Pre Normal


`````js filename=intro
({
  x: { y: y = $(`fail`) },
} = 0);
$(`bad`);
`````

## Normalized


`````js filename=intro
const tmpAssignObjPatternRhs = 0;
const objPatternNoDefault = tmpAssignObjPatternRhs.x;
const objPatternBeforeDefault = objPatternNoDefault.y;
const tmpIfTest = objPatternBeforeDefault === undefined;
if (tmpIfTest) {
  y = $(`fail`);
} else {
  y = objPatternBeforeDefault;
}
$(`bad`);
`````

## Output


`````js filename=intro
const objPatternNoDefault /*:unknown*/ = (0).x;
const objPatternBeforeDefault /*:unknown*/ = objPatternNoDefault.y;
const tmpIfTest /*:boolean*/ = objPatternBeforeDefault === undefined;
if (tmpIfTest) {
  y = $(`fail`);
} else {
  y = objPatternBeforeDefault;
}
$(`bad`);
`````

## PST Output

With rename=true

`````js filename=intro
const a = 0.x;
const b = a.y;
const c = b === undefined;
if (c) {
  y = $( "fail" );
}
else {
  y = b;
}
$( "bad" );
`````

## Globals

BAD@! Found 1 implicit global bindings:

y

## Result

Should call `$` with:
 - eval returned: ('<crash[ Cannot read property <ref> of <ref2> ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
