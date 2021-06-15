# Preval test case

# default_no_no__empty_str.md

> Normalize > Pattern > Assignment > Obj > Arr > Default no no  empty str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
({ x: [] } = '');
$('bad');
`````

## Pre Normal

`````js filename=intro
({
  x: [],
} = ``);
$(`bad`);
`````

## Normalized

`````js filename=intro
const tmpAssignObjPatternRhs = ``;
const objPatternNoDefault = tmpAssignObjPatternRhs.x;
const arrPatternSplat = [...objPatternNoDefault];
$(`bad`);
`````

## Output

`````js filename=intro
const objPatternNoDefault = ``.x;
[...objPatternNoDefault];
$(`bad`);
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
