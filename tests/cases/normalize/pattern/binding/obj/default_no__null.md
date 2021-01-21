# Preval test case

# default_no__null.md

> normalize > pattern >  > param > obj > default_no__null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const {} = null;
$('bad');
`````

## Normalized

`````js filename=intro
const bindingPatternObjRoot = null;
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
  objPatternCrashTest = null.cannotDestructureThis;
}
$('bad');
`````

## Result

Should call `$` with:
["<crash[ Cannot read property 'cannotDestructureThis' of null ]>"];

Normalized calls: Same

Final output calls: Same
