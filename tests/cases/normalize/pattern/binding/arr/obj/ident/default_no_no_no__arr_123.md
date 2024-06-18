# Preval test case

# default_no_no_no__arr_123.md

> Normalize > Pattern > Binding > Arr > Obj > Ident > Default no no no  arr 123
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
const [{ x }] = [1, 2, 3, 20, 30];
$(x);
`````

## Pre Normal


`````js filename=intro
const [{ x: x }] = [1, 2, 3, 20, 30];
$(x);
`````

## Normalized


`````js filename=intro
const bindingPatternArrRoot = [1, 2, 3, 20, 30];
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternStep = arrPatternSplat[0];
const x = arrPatternStep.x;
$(x);
`````

## Output


`````js filename=intro
const x = (1).x;
$(x);
`````

## PST Output

With rename=true

`````js filename=intro
const a = 1.x;
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
