# Preval test case

# default_no_no__obj_str.md

> Normalize > Pattern > Assignment > Obj > Arr > Default no no  obj str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
({ x: [] } = { x: 'abc', a: 11, b: 12 });
$('ok');
`````

## Pre Normal


`````js filename=intro
({
  x: [],
} = { x: `abc`, a: 11, b: 12 });
$(`ok`);
`````

## Normalized


`````js filename=intro
const tmpAssignObjPatternRhs = { x: `abc`, a: 11, b: 12 };
const objPatternNoDefault = tmpAssignObjPatternRhs.x;
const arrPatternSplat = [...objPatternNoDefault];
$(`ok`);
`````

## Output


`````js filename=intro
$(`ok`);
`````

## PST Output

With rename=true

`````js filename=intro
$( "ok" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'ok'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
