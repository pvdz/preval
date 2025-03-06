# Preval test case

# default_no_no_no__empty_str.md

> Normalize > Pattern > Binding > Arr > Obj > Ident > Default no no no  empty str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
const [{ x }] = '';
$('bad');
`````

## Pre Normal


`````js filename=intro
const [{ x: x }] = ``;
$(`bad`);
`````

## Normalized


`````js filename=intro
const bindingPatternArrRoot = ``;
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternStep = arrPatternSplat[0];
const x = arrPatternStep.x;
$(`bad`);
`````

## Output


`````js filename=intro
undefined.x;
throw `[Preval]: Can not reach here`;
`````

## PST Output

With rename=true

`````js filename=intro
undefined.x;
throw "[Preval]: Can not reach here";
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ Cannot read property <ref> of <ref2> ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

Todos triggered:
- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope