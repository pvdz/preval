# Preval test case

# default_no_no_no__arr_elided.md

> Normalize > Pattern > Binding > Arr > Arr > Ident > Default no no no  arr elided
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
const [[x]] = [, , , , 4, 5];
$('bad');
`````

## Pre Normal


`````js filename=intro
const [[x]] = [, , , , 4, 5];
$(`bad`);
`````

## Normalized


`````js filename=intro
const bindingPatternArrRoot = [, , , , 4, 5];
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternStep = arrPatternSplat[0];
const arrPatternSplat$1 = [...arrPatternStep];
const x = arrPatternSplat$1[0];
$(`bad`);
`````

## Output


`````js filename=intro
[...undefined];
throw `[Preval]: Array spread must crash before this line`;
`````

## PST Output

With rename=true

`````js filename=intro
[ ...undefined ];
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
