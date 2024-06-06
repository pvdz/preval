# Preval test case

# arr_obj.md

> Normalize > Pattern > Binding > Base unique > Arr obj
>
> Testing simple pattern normalizations. Make sure pattern bindings are properly renamed to be globally unique.

## Input

`````js filename=intro
{ let x = 1; }
const [{ x }] = [{ x: 100}];
{ let x = 1; }
$(x);
`````

## Pre Normal


`````js filename=intro
{
  let x$1 = 1;
}
const [{ x: x }] = [{ x: 100 }];
{
  let x$3 = 1;
}
$(x);
`````

## Normalized


`````js filename=intro
let x$1 = 1;
const tmpArrElement = { x: 100 };
const bindingPatternArrRoot = [tmpArrElement];
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternStep = arrPatternSplat[0];
const x = arrPatternStep.x;
let x$3 = 1;
$(x);
`````

## Output


`````js filename=intro
$(100);
`````

## PST Output

With rename=true

`````js filename=intro
$( 100 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
