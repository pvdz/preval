# Preval test case

# default_no_no__arr_empty_str.md

> Normalize > Pattern > Binding > Arr > Arr > Default no no  arr empty str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
const [[]] = ['', 4, 5];
$('ok');
`````

## Pre Normal


`````js filename=intro
const [[]] = [``, 4, 5];
$(`ok`);
`````

## Normalized


`````js filename=intro
const bindingPatternArrRoot = [``, 4, 5];
const arrPatternSplat = [...bindingPatternArrRoot];
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