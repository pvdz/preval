# Preval test case

# base.md

> normalize > pattern > param > obj > base
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
const bindingPatternObjRoot = { a: 1, b: 2, c: 3 };
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
const bindingPatternObjRoot = { a: 1, b: 2, c: 3 };
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

## Result

Should call `$` with:
 - 0: "ok"
 - 1: undefined

Normalized calls: Same

Final output calls: Same
