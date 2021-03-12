# Preval test case

# default_no__null.md

> Normalize > Pattern > Binding > Obj > Default no  null
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
const $tdz$__pattern_after_default = null;
let objPatternCrashTest = $tdz$__pattern_after_default === undefined;
if (objPatternCrashTest) {
} else {
  objPatternCrashTest = $tdz$__pattern_after_default === null;
}
if (objPatternCrashTest) {
  objPatternCrashTest = $tdz$__pattern_after_default.cannotDestructureThis;
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
  null.cannotDestructureThis;
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

Normalized calls: Same

Final output calls: Same
