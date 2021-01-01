# Preval test case

# default_no__str.md

> normalize > pattern >  > param > arr > rest > default_no__str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const [...x] = 'abc';
$(x);
`````

## Normalized

`````js filename=intro
const bindingPatternArrRoot = 'abc';
const arrPatternSplat = [...bindingPatternArrRoot];
const x = arrPatternSplat.slice(0);
$(x);
`````

## Output

`````js filename=intro
const arrPatternSplat = [...'abc'];
const x = arrPatternSplat.slice(0);
$(x);
`````
