# Preval test case

# default_no_no_no__obj_arr_str.md

> Normalize > Pattern > Assignment > Obj > Arr > Ident > Default no no no  obj arr str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
({ x: [y] } = { x: ['abc'], a: 11, b: 12 });
$(y);
`````

## Pre Normal

`````js filename=intro
({
  x: [y],
} = { x: [`abc`], a: 11, b: 12 });
$(y);
`````

## Normalized

`````js filename=intro
const tmpObjLitVal = [`abc`];
const tmpAssignObjPatternRhs = { x: tmpObjLitVal, a: 11, b: 12 };
const objPatternNoDefault = tmpAssignObjPatternRhs.x;
const arrPatternSplat = [...objPatternNoDefault];
y = arrPatternSplat[0];
$(y);
`````

## Output

`````js filename=intro
y = `abc`;
$(y);
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
