# Preval test case

# default_no__undefined.md

> Normalize > Pattern > Binding > Obj > Default no  undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const {} = undefined;
$('bad');
`````

## Pre Normal

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
let objPatternCrashTest = true;
if (objPatternCrashTest) {
} else {
  objPatternCrashTest = false;
}
if (objPatternCrashTest) {
  undefined.cannotDestructureThis;
  throw '[Preval]: Can not reach here';
} else {
  $('bad');
}
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ Cannot read property <ref> of <ref2> ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
