# Preval test case

# default_no__null.md

> Normalize > Pattern > Assignment > Obj > Default no  null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
({} = null);
$('bad');
`````

## Pre Normal


`````js filename=intro
({} = null);
$(`bad`);
`````

## Normalized


`````js filename=intro
const tmpAssignObjPatternRhs = null;
let objPatternCrashTest = tmpAssignObjPatternRhs === undefined;
if (objPatternCrashTest) {
} else {
  objPatternCrashTest = tmpAssignObjPatternRhs === null;
}
if (objPatternCrashTest) {
  objPatternCrashTest = tmpAssignObjPatternRhs.cannotDestructureThis;
} else {
}
$(`bad`);
`````

## Output


`````js filename=intro
null.cannotDestructureThis;
throw `[Preval]: Can not reach here`;
`````

## PST Output

With rename=true

`````js filename=intro
null.cannotDestructureThis;
throw "[Preval]: Can not reach here";
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ Cannot read property <ref> of <ref2> ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
