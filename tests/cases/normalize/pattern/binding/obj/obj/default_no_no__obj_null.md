# Preval test case

# default_no_no__obj_null.md

> Normalize > Pattern > Binding > Obj > Obj > Default no no  obj null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x: {} } = { x: null, b: 11, c: 12 };
$('bad');
`````

## Normalized

`````js filename=intro
const $tdz$__pattern_after_default = { x: null, b: 11, c: 12 };
const objPatternNoDefault = $tdz$__pattern_after_default.x;
let objPatternCrashTest = objPatternNoDefault === undefined;
if (objPatternCrashTest) {
} else {
  objPatternCrashTest = objPatternNoDefault === null;
}
if (objPatternCrashTest) {
  objPatternCrashTest = objPatternNoDefault.cannotDestructureThis;
}
$('bad');
`````

## Output

`````js filename=intro
const $tdz$__pattern_after_default = { x: null, b: 11, c: 12 };
const objPatternNoDefault = $tdz$__pattern_after_default.x;
let objPatternCrashTest = objPatternNoDefault === undefined;
if (objPatternCrashTest) {
} else {
  objPatternCrashTest = objPatternNoDefault === null;
}
if (objPatternCrashTest) {
  objPatternNoDefault.cannotDestructureThis;
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
