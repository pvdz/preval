# Preval test case

# default_no__null.md

> normalize > pattern >  > param > arr > default_no__null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const [] = null;
$('bad');
`````

## Normalized

`````js filename=intro
const bindingPatternArrRoot = null,
  arrPatternSplat = [...bindingPatternArrRoot];
$('bad');
`````

## Output

`````js filename=intro
$('bad');
`````
