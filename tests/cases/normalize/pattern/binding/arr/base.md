# Preval test case

# base.md

> normalize > pattern >  > param > arr > base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const [] = [1, 2, 3];
$('ok');
`````

## Normalized

`````js filename=intro
const bindingPatternArrRoot = [1, 2, 3],
  arrPatternSplat = [...bindingPatternArrRoot];
$('ok');
`````

## Output

`````js filename=intro
const bindingPatternArrRoot = [1, 2, 3];
$('ok');
`````
