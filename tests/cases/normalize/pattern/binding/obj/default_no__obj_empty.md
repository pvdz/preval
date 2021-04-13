# Preval test case

# default_no__obj_empty.md

> Normalize > Pattern > Binding > Obj > Default no  obj empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const {} = {};
$('ok');
`````

## Pre Normal

`````js filename=intro
const {} = {};
$('ok');
`````

## Normalized

`````js filename=intro
const bindingPatternObjRoot = {};
let objPatternCrashTest = bindingPatternObjRoot === undefined;
if (objPatternCrashTest) {
} else {
  objPatternCrashTest = bindingPatternObjRoot === null;
}
if (objPatternCrashTest) {
  objPatternCrashTest = bindingPatternObjRoot.cannotDestructureThis;
} else {
}
$('ok');
`````

## Output

`````js filename=intro
const bindingPatternObjRoot = {};
let objPatternCrashTest = bindingPatternObjRoot === undefined;
if (objPatternCrashTest) {
} else {
  objPatternCrashTest = bindingPatternObjRoot === null;
}
if (objPatternCrashTest) {
  bindingPatternObjRoot.cannotDestructureThis;
} else {
}
$('ok');
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'ok'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
