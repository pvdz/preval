# Preval test case

# default_no_no__arr_null.md

> Normalize > Pattern > Binding > Arr > Ident > Default no no  arr null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const [x] = [null];
$(x);
`````

## Normalized

`````js filename=intro
const bindingPatternArrRoot = [null];
const arrPatternSplat = [...bindingPatternArrRoot];
const x = arrPatternSplat[0];
$(x);
`````

## Output

`````js filename=intro
const bindingPatternArrRoot = [null];
const arrPatternSplat = [...bindingPatternArrRoot];
const x = arrPatternSplat[0];
$(x);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: null
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
