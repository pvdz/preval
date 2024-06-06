# Preval test case

# base.md

> Normalize > Pattern > Binding > Obj > Arr > Arr > Rest > Base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x: [[...y]] } = { x: [[1, 2, 3], 13], a: 11, b: 12 };
$(y);
`````

## Pre Normal


`````js filename=intro
const {
  x: [[...y]],
} = { x: [[1, 2, 3], 13], a: 11, b: 12 };
$(y);
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
const y = arrPatternSplat$1.slice(0);
$(y);
`````

## Output


`````js filename=intro
const arrPatternSplat$1 = [1, 2, 3];
const y = arrPatternSplat$1.slice(0);
$(y);
`````

## PST Output

With rename=true

`````js filename=intro
const a = [ 1, 2, 3 ];
const b = a.slice( 0 );
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: [1, 2, 3]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
