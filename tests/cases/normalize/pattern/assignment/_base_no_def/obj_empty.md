# Preval test case

# obj_empty.md

> Normalize > Pattern > Assignment > Base no def > Obj empty
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
({ } = 1);
`````

## Pre Normal

`````js filename=intro
({} = 1);
`````

## Normalized

`````js filename=intro
const tmpAssignObjPatternRhs = 1;
let objPatternCrashTest = tmpAssignObjPatternRhs === undefined;
if (objPatternCrashTest) {
} else {
  objPatternCrashTest = tmpAssignObjPatternRhs === null;
}
if (objPatternCrashTest) {
  objPatternCrashTest = tmpAssignObjPatternRhs.cannotDestructureThis;
} else {
}
`````

## Output

`````js filename=intro

`````

## PST Output

With rename=true

`````js filename=intro

`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
