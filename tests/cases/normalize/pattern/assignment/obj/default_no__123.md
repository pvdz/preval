# Preval test case

# default_no__123.md

> normalize > pattern >  > param > obj > default_no__123
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
({} = 1);
$('ok');
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
$('ok');
`````

## Output

`````js filename=intro
let objPatternCrashTest = 1 === undefined;
if (objPatternCrashTest) {
} else {
  objPatternCrashTest = 1 === null;
}
if (objPatternCrashTest) {
  objPatternCrashTest = (1).cannotDestructureThis;
}
$('ok');
`````

## Result

Should call `$` with:
 - 1: 'ok'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
