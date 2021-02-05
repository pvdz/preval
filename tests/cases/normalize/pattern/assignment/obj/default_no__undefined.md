# Preval test case

# default_no__undefined.md

> normalize > pattern >  > param > obj > default_no__undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
({} = undefined);
$('bad');
`````

## Normalized

`````js filename=intro
const tmpAssignObjPatternRhs = undefined;
let objPatternCrashTest = tmpAssignObjPatternRhs === undefined;
if (objPatternCrashTest) {
} else {
  objPatternCrashTest = tmpAssignObjPatternRhs === null;
}
if (objPatternCrashTest) {
  objPatternCrashTest = tmpAssignObjPatternRhs.cannotDestructureThis;
}
tmpAssignObjPatternRhs;
$('bad');
`````

## Output

`````js filename=intro
let objPatternCrashTest = false;
if (objPatternCrashTest) {
} else {
  objPatternCrashTest = false;
}
if (objPatternCrashTest) {
  objPatternCrashTest = undefined.cannotDestructureThis;
}
$('bad');
`````

## Result

Should call `$` with:
 - eval returned: ('<crash[ Cannot read property <ref> of <ref2> ]>')

Normalized calls: Same

Final output calls: BAD!!
 - 1: 'bad'
 - eval returned: undefined
