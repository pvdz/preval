# Preval test case

# default_yes_no_no__obj_arr_empty.md

> Normalize > Pattern > Assignment > Obj > Arr > Ident > Default yes no no  obj arr empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
({ x: [y = 'pass'] } = { x: [], a: 11, b: 12 });
$(y);
`````

## Pre Normal


`````js filename=intro
({
  x: [y = `pass`],
} = { x: [], a: 11, b: 12 });
$(y);
`````

## Normalized


`````js filename=intro
const tmpObjLitVal = [];
const tmpAssignObjPatternRhs = { x: tmpObjLitVal, a: 11, b: 12 };
const objPatternNoDefault = tmpAssignObjPatternRhs.x;
const arrPatternSplat = [...objPatternNoDefault];
const arrPatternBeforeDefault = arrPatternSplat[0];
const tmpIfTest = arrPatternBeforeDefault === undefined;
if (tmpIfTest) {
  y = `pass`;
} else {
  y = arrPatternBeforeDefault;
}
$(y);
`````

## Output


`````js filename=intro
y = `pass`;
$(y);
`````

## PST Output

With rename=true

`````js filename=intro
y = "pass";
$( y );
`````

## Globals

BAD@! Found 1 implicit global bindings:

y

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
