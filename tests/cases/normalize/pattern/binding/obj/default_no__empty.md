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
let objPatternCrashTest = false;
if (objPatternCrashTest) {
} else {
  objPatternCrashTest = true;
}
if (objPatternCrashTest) {
  objPatternCrashTest = (1).cannotDestructureThis;
}
$('bad');
`````

## Result

Should call `$` with:
 - 0: "bad"
 - 1: undefined

Normalized calls: Same

Final output calls: Same
