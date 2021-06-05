# Preval test case

# default_no_no_no__arr_elided.md

> Normalize > Pattern > Binding > Arr > Obj > Ident > Default no no no  arr elided
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const [{ x }] = [, , , 1, 20, 30];
$('bad');
`````

## Pre Normal

`````js filename=intro
const [{ x: x }] = [, , , 1, 20, 30];
$('bad');
`````

## Normalized

`````js filename=intro
const bindingPatternArrRoot = [, , , 1, 20, 30];
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternStep = arrPatternSplat[0];
const x = arrPatternStep.x;
$('bad');
`````

## Output

`````js filename=intro
undefined.x;
throw '[Preval]: Can not reach here';
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ Cannot read property <ref> of <ref2> ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
