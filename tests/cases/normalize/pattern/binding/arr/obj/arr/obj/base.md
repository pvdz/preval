# Preval test case

# base.md

> Normalize > Pattern > Binding > Arr > Obj > Arr > Obj > Base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
const [
  {
    x: [{}],
  },
] = [{ x: [{ a: 1, b: 2, c: 3 }, 12], y: 11 }, 10];
$('ok');
`````

## Pre Normal


`````js filename=intro
const [
  {
    x: [{}],
  },
] = [{ x: [{ a: 1, b: 2, c: 3 }, 12], y: 11 }, 10];
$(`ok`);
`````

## Normalized


`````js filename=intro
const tmpArrElement$1 = { a: 1, b: 2, c: 3 };
const tmpObjLitVal = [tmpArrElement$1, 12];
const tmpArrElement = { x: tmpObjLitVal, y: 11 };
const bindingPatternArrRoot = [tmpArrElement, 10];
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternStep = arrPatternSplat[0];
const objPatternNoDefault = arrPatternStep.x;
const arrPatternSplat$1 = [...objPatternNoDefault];
const arrPatternStep$1 = arrPatternSplat$1[0];
let objPatternCrashTest = arrPatternStep$1 === undefined;
if (objPatternCrashTest) {
} else {
  objPatternCrashTest = arrPatternStep$1 === null;
}
if (objPatternCrashTest) {
  objPatternCrashTest = arrPatternStep$1.cannotDestructureThis;
} else {
}
$(`ok`);
`````

## Output


`````js filename=intro
$(`ok`);
`````

## PST Output

With rename=true

`````js filename=intro
$( "ok" );
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

Todos triggered:
- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope