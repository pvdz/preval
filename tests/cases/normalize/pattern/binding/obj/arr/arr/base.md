# Preval test case

# base.md

> Normalize > Pattern > Binding > Obj > Arr > Arr > Base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
const { x: [[]] } = { x: [[1, 2, 3], 13], a: 11, b: 12 };
$('ok');
`````

## Pre Normal


`````js filename=intro
const {
  x: [[]],
} = { x: [[1, 2, 3], 13], a: 11, b: 12 };
$(`ok`);
`````

## Normalized


`````js filename=intro
const tmpArrElement = [1, 2, 3];
const tmpObjLitVal = [tmpArrElement, 13];
const bindingPatternObjRoot = { x: tmpObjLitVal, a: 11, b: 12 };
const objPatternNoDefault = bindingPatternObjRoot.x;
const arrPatternSplat = [...objPatternNoDefault];
const arrPatternStep = arrPatternSplat[0];
const arrPatternSplat$1 = [...arrPatternStep];
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