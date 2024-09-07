# Preval test case

# default_no_no__arr_123.md

> Normalize > Pattern > Binding > Arr > Arr > Default no no  arr 123
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
const [[]] = [1, 2, 3, 4, 5];
$('bad');
`````

## Pre Normal


`````js filename=intro
const [[]] = [1, 2, 3, 4, 5];
$(`bad`);
`````

## Normalized


`````js filename=intro
const bindingPatternArrRoot = [1, 2, 3, 4, 5];
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternStep = arrPatternSplat[0];
const arrPatternSplat$1 = [...arrPatternStep];
$(`bad`);
`````

## Output


`````js filename=intro
[...1];
throw `[Preval]: Array spread must crash before this line`;
`````

## PST Output

With rename=true

`````js filename=intro
[ ...1 ];
throw "[Preval]: Array spread must crash before this line";
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
