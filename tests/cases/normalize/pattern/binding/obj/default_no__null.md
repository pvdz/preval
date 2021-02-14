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
let objPatternCrashTest = null === undefined;
if (objPatternCrashTest) {
} else {
  objPatternCrashTest = null === null;
}
if (objPatternCrashTest) {
  objPatternCrashTest = null.cannotDestructureThis;
}
$('bad');
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ Cannot read property <ref> of <ref2> ]>')

Normalized calls: Same

Final output calls: Same
