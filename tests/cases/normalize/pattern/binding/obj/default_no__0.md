# Preval test case

# default_no__0.md

> normalize > pattern >  > param > obj > default_no__0
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const {} = 0;
$('ok');
`````

## Normalized

`````js filename=intro
const bindingPatternObjRoot = 0;
let objPatternCrashTest = bindingPatternObjRoot === undefined;
if (objPatternCrashTest) {
} else {
  objPatternCrashTest = bindingPatternObjRoot === null;
}
if (objPatternCrashTest) {
  objPatternCrashTest = bindingPatternObjRoot.cannotDestructureThis;
}
$('ok');
`````

## Output

`````js filename=intro
let objPatternCrashTest = 0 === undefined;
if (objPatternCrashTest) {
} else {
  objPatternCrashTest = 0 === null;
}
if (objPatternCrashTest) {
  objPatternCrashTest = (0).cannotDestructureThis;
}
$('ok');
`````

## Result

Should call `$` with:
 - 1: 'ok'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
