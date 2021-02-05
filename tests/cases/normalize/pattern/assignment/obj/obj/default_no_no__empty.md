# Preval test case

# default_no_no__empty.md

> normalize > pattern >  > param > obj > obj > default_no_no__empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
({ x: {} } = 1);
$('bad');
`````

## Normalized

`````js filename=intro
const tmpAssignObjPatternRhs = 1;
const objPatternNoDefault = tmpAssignObjPatternRhs.x;
let objPatternCrashTest = objPatternNoDefault === undefined;
if (objPatternCrashTest) {
} else {
  objPatternCrashTest = objPatternNoDefault === null;
}
if (objPatternCrashTest) {
  objPatternCrashTest = objPatternNoDefault.cannotDestructureThis;
}
tmpAssignObjPatternRhs;
$('bad');
`````

## Output

`````js filename=intro
const objPatternNoDefault = (1).x;
let objPatternCrashTest = objPatternNoDefault === undefined;
if (objPatternCrashTest) {
} else {
  objPatternCrashTest = objPatternNoDefault === null;
}
if (objPatternCrashTest) {
  objPatternCrashTest = objPatternNoDefault.cannotDestructureThis;
}
$('bad');
`````

## Result

Should call `$` with:
 - eval returned: ('<crash[ Cannot read property <ref> of <ref2> ]>')

Normalized calls: Same

Final output calls: Same
