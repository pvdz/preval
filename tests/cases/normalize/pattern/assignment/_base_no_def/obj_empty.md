# Preval test case

# obj.md

> normalize > pattern > param > _base > obj
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
  objPatternCrashTest = true;
}
if (objPatternCrashTest) {
  objPatternCrashTest = (1).cannotDestructureThis;
}
`````

## Result

Should call `$` with:
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
