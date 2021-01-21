# Preval test case

# default_no__undefined.md

> normalize > pattern >  > param > obj > default_no__undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const {} = undefined;
$('bad');
`````

## Normalized

`````js filename=intro
const bindingPatternObjRoot = undefined;
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
  objPatternCrashTest = false;
}
if (objPatternCrashTest) {
  objPatternCrashTest = undefined.cannotDestructureThis;
}
$('bad');
`````

## Result

Should call `$` with:
 - 0: <crash[ Cannot read property 'cannotDestructureThis' of undefined ]>

Normalized calls: Same

Final output calls: BAD!!
[['bad'], null];

