# Preval test case

# default_no_no__0.md

> Normalize > Pattern > Assignment > Obj > Arr > Default no no  0
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
({ x: [] } = 0);
$('bad');
`````

## Pre Normal


`````js filename=intro
({
  x: [],
} = 0);
$(`bad`);
`````

## Normalized


`````js filename=intro
const tmpAssignObjPatternRhs = 0;
const objPatternNoDefault = tmpAssignObjPatternRhs.x;
const arrPatternSplat = [...objPatternNoDefault];
$(`bad`);
`````

## Output


`````js filename=intro
const objPatternNoDefault = (0).x;
[...objPatternNoDefault];
$(`bad`);
`````

## PST Output

With rename=true

`````js filename=intro
const a = 0.x;
[ ... a ];
$( "bad" );
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
