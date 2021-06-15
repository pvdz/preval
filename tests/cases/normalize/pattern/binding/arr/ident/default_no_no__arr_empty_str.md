# Preval test case

# default_no_no__arr_empty_str.md

> Normalize > Pattern > Binding > Arr > Ident > Default no no  arr empty str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const [x] = [''];
$(x);
`````

## Pre Normal

`````js filename=intro
const [x] = [``];
$(x);
`````

## Normalized

`````js filename=intro
const bindingPatternArrRoot = [``];
const arrPatternSplat = [...bindingPatternArrRoot];
const x = arrPatternSplat[0];
$(x);
`````

## Output

`````js filename=intro
$(``);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: ''
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
