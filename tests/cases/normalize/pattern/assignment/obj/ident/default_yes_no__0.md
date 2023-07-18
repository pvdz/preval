# Preval test case

# default_yes_no__0.md

> Normalize > Pattern > Assignment > Obj > Ident > Default yes no  0
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
({ x = $('pass') } = 0);
$(x);
`````

## Pre Normal

`````js filename=intro
({ x: x = $(`pass`) } = 0);
$(x);
`````

## Normalized

`````js filename=intro
const tmpAssignObjPatternRhs = 0;
const objPatternBeforeDefault = tmpAssignObjPatternRhs.x;
const tmpIfTest = objPatternBeforeDefault === undefined;
if (tmpIfTest) {
  x = $(`pass`);
} else {
  x = objPatternBeforeDefault;
}
$(x);
`````

## Output

`````js filename=intro
const objPatternBeforeDefault = (0).x;
const tmpIfTest = objPatternBeforeDefault === undefined;
if (tmpIfTest) {
  x = $(`pass`);
  $(x);
} else {
  x = objPatternBeforeDefault;
  $(x);
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = 0.x;
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

## Result

Should call `$` with:
 - 1: 'pass'
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
