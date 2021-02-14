# Preval test case

# default_no__arr_elided.md

> normalize > pattern >  > param > arr > default_no__arr_elided
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const [] = [, , 1];
$('ok');
`````

## Normalized

`````js filename=intro
const bindingPatternArrRoot = [, , 1];
const arrPatternSplat = [...bindingPatternArrRoot];
$('ok');
`````

## Output

`````js filename=intro
const bindingPatternArrRoot = [, , 1];
const arrPatternSplat = [...bindingPatternArrRoot];
$('ok');
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'ok'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
