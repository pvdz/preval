# Preval test case

# default_no_no__obj_undefined.md

> Normalize > Pattern > Binding > Obj > Obj > Default no no  obj undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
const { x: {} } = { x: undefined, b: 11, c: 12 };
$('bad');
`````

## Pre Normal


`````js filename=intro
const {
  x: {},
} = { x: undefined, b: 11, c: 12 };
$(`bad`);
`````

## Normalized


`````js filename=intro
const bindingPatternObjRoot = { x: undefined, b: 11, c: 12 };
const objPatternNoDefault = bindingPatternObjRoot.x;
let objPatternCrashTest = objPatternNoDefault === undefined;
if (objPatternCrashTest) {
} else {
  objPatternCrashTest = objPatternNoDefault === null;
}
if (objPatternCrashTest) {
  objPatternCrashTest = objPatternNoDefault.cannotDestructureThis;
} else {
}
$(`bad`);
`````

## Output


`````js filename=intro
undefined.cannotDestructureThis;
throw `[Preval]: Can not reach here`;
`````

## PST Output

With rename=true

`````js filename=intro
undefined.cannotDestructureThis;
throw "[Preval]: Can not reach here";
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ Cannot read property <ref> of <ref2> ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
