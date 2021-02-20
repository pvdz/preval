# Preval test case

# obj_empty.md

> Normalize > Pattern > Assignment > Base no def > Obj empty
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
({ } = 1);
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
}
`````

## Output

`````js filename=intro
let objPatternCrashTest = false;
if (objPatternCrashTest) {
} else {
  objPatternCrashTest = false;
}
if (objPatternCrashTest) {
  (1).cannotDestructureThis;
}
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
