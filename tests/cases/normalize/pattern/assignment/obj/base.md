# Preval test case

# base.md

> Normalize > Pattern > Assignment > Obj > Base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
({} = { a: 1, b: 2, c: 3 });
$('ok');
`````

## Pre Normal


`````js filename=intro
({} = { a: 1, b: 2, c: 3 });
$(`ok`);
`````

## Normalized


`````js filename=intro
const tmpAssignObjPatternRhs = { a: 1, b: 2, c: 3 };
let objPatternCrashTest = tmpAssignObjPatternRhs === undefined;
if (objPatternCrashTest) {
} else {
  objPatternCrashTest = tmpAssignObjPatternRhs === null;
}
if (objPatternCrashTest) {
  objPatternCrashTest = tmpAssignObjPatternRhs.cannotDestructureThis;
} else {
}
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
