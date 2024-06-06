# Preval test case

# arr_obj.md

> Normalize > Pattern > Assignment > Base unique > Arr obj
>
> Testing simple pattern normalizations. Make sure pattern bindings are properly renamed to be globally unique.

## Input

`````js filename=intro
{ let x = 1; }
([{ x }] = [{ x: 100 }]);
{ let x = 1; }
$(x);
`````

## Pre Normal


`````js filename=intro
{
  let x$3 = 1;
}
[{ x: x }] = [{ x: 100 }];
{
  let x$1 = 1;
}
$(x);
`````

## Normalized


`````js filename=intro
let x$3 = 1;
const tmpArrElement = { x: 100 };
const arrAssignPatternRhs = [tmpArrElement];
const arrPatternSplat = [...arrAssignPatternRhs];
const arrPatternStep = arrPatternSplat[0];
x = arrPatternStep.x;
let x$1 = 1;
$(x);
`````

## Output


`````js filename=intro
x = 100;
$(x);
`````

## PST Output

With rename=true

`````js filename=intro
x = 100;
$( x );
`````

## Globals

BAD@! Found 1 implicit global bindings:

x

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
