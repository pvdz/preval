# Preval test case

# default_yes_no__obj_undefined.md

> Normalize > Pattern > Assignment > Obj > Ident > Default yes no  obj undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
({ x = $('pass') } = { x: undefined });
$(x);
`````

## Pre Normal


`````js filename=intro
({ x: x = $(`pass`) } = { x: undefined });
$(x);
`````

## Normalized


`````js filename=intro
const tmpAssignObjPatternRhs = { x: undefined };
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
x = $(`pass`);
$(x);
`````

## PST Output

With rename=true

`````js filename=intro
x = $( "pass" );
$( x );
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
