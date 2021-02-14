# Preval test case

# default_no__empty.md

> normalize > pattern >  > param > obj > default_no__empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const {} = 1;
$('bad');
`````

## Normalized

`````js filename=intro
const bindingPatternObjRoot = 1;
let objPatternCrashTest = bindingPatternObjRoot === undefined;
if (objPatternCrashTest) {
} else {
  objPatternCrashTest = bindingPatternObjRoot === null;
}
if (objPatternCrashTest) {
  objPatternCrashTest = bindingPatternObjRoot.cannotDestructureThis;
}
$('bad');
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
$('bad');
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'bad'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
