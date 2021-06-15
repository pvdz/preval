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

## Pre Normal

`````js filename=intro
const {} = { a: 1, b: 2, c: 3 };
$(`ok`);
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
} else {
}
$(`ok`);
`````

## Output

`````js filename=intro
$(`ok`);
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
