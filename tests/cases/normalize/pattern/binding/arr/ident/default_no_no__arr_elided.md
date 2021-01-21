# Preval test case

# default_no_no__arr_elided.md

> normalize > pattern >  > param > arr > ident > default_no_no__arr_elided
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const [x] = [, , , 1];
$(x);
`````

## Normalized

`````js filename=intro
const bindingPatternArrRoot = [, , , 1];
const arrPatternSplat = [...bindingPatternArrRoot];
const x = arrPatternSplat[0];
$(x);
`````

## Output

`````js filename=intro
const bindingPatternArrRoot = [, , , 1];
const arrPatternSplat = [...bindingPatternArrRoot];
const x = arrPatternSplat[0];
$(x);
`````

## Result

Should call `$` with:
 - 0: null
 - 1: undefined

Normalized calls: Same

Final output calls: Same
