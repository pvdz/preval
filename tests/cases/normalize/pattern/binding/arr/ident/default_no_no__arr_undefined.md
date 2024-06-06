# Preval test case

# default_no_no__arr_undefined.md

> Normalize > Pattern > Binding > Arr > Ident > Default no no  arr undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const [x] = [undefined];
$(x);
`````

## Pre Normal


`````js filename=intro
const [x] = [undefined];
$(x);
`````

## Normalized


`````js filename=intro
const bindingPatternArrRoot = [undefined];
const arrPatternSplat = [...bindingPatternArrRoot];
const x = arrPatternSplat[0];
$(x);
`````

## Output


`````js filename=intro
$(undefined);
`````

## PST Output

With rename=true

`````js filename=intro
$( undefined );
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
