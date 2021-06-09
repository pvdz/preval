# Preval test case

# default_no_no_no__arr_obj_empty.md

> Normalize > Pattern > Binding > Arr > Obj > Ident > Default no no no  arr obj empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const [{ x }] = [{}, 20, 30];
$(x);
`````

## Pre Normal

`````js filename=intro
const [{ x: x }] = [{}, 20, 30];
$(x);
`````

## Normalized

`````js filename=intro
const tmpArrElement = {};
const bindingPatternArrRoot = [tmpArrElement, 20, 30];
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternStep = arrPatternSplat[0];
const x = arrPatternStep.x;
$(x);
`````

## Output

`````js filename=intro
const tmpObjectPrototype = Object.prototype;
const x = tmpObjectPrototype.x;
$(x);
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
