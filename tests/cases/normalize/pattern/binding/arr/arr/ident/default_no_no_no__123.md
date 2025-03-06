# Preval test case

# default_no_no_no__123.md

> Normalize > Pattern > Binding > Arr > Arr > Ident > Default no no no  123
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
const [[x]] = 1; // Expect to crash
$('bad');
`````

## Pre Normal


`````js filename=intro
const [[x]] = 1;
$(`bad`);
`````

## Normalized


`````js filename=intro
const bindingPatternArrRoot = 1;
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternStep = arrPatternSplat[0];
const arrPatternSplat$1 = [...arrPatternStep];
const x = arrPatternSplat$1[0];
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

Todos triggered:
- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope