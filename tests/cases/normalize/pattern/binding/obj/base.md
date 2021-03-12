# Preval test case

# base.md

> Normalize > Pattern > Binding > Obj > Base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const {} = { a: 1, b: 2, c: 3 };
$('ok');
`````

## Normalized

`````js filename=intro
const $tdz$__pattern_after_default = { a: 1, b: 2, c: 3 };
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
const $tdz$__pattern_after_default = { a: 1, b: 2, c: 3 };
let objPatternCrashTest = $tdz$__pattern_after_default === undefined;
if (objPatternCrashTest) {
} else {
  objPatternCrashTest = $tdz$__pattern_after_default === null;
}
if (objPatternCrashTest) {
  $tdz$__pattern_after_default.cannotDestructureThis;
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
