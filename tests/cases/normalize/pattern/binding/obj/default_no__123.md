# Preval test case

# default_no__123.md

> Normalize > Pattern > Binding > Obj > Default no  123
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const {} = 1;
$('ok');
`````

## Normalized

`````js filename=intro
const $tdz$__pattern_after_default = 1;
let objPatternCrashTest = $tdz$__pattern_after_default === undefined;
if (objPatternCrashTest) {
} else {
  objPatternCrashTest = $tdz$__pattern_after_default === null;
}
if (objPatternCrashTest) {
  objPatternCrashTest = $tdz$__pattern_after_default.cannotDestructureThis;
}
$('ok');
`````

## Output

`````js filename=intro
let objPatternCrashTest = false;
if (objPatternCrashTest) {
} else {
  objPatternCrashTest = false;
}
if (objPatternCrashTest) {
  (1).cannotDestructureThis;
}
$('ok');
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'ok'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
