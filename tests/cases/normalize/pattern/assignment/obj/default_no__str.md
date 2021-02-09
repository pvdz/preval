# Preval test case

# default_no__str.md

> normalize > pattern >  > param > obj > default_no__str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
({} = 'abc');
$('ok');
`````

## Normalized

`````js filename=intro
const tmpAssignObjPatternRhs = 'abc';
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
let objPatternCrashTest = false;
if (objPatternCrashTest) {
} else {
  objPatternCrashTest = false;
}
if (objPatternCrashTest) {
  objPatternCrashTest = 'abc'.cannotDestructureThis;
}
$('ok');
`````

## Result

Should call `$` with:
 - 1: 'ok'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
