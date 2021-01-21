# Preval test case

# default_no__str.md

> normalize > pattern >  > param > arr > default_no__str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const [] = 'xyz';
$('ok');
`````

## Normalized

`````js filename=intro
const bindingPatternArrRoot = 'xyz';
const arrPatternSplat = [...bindingPatternArrRoot];
$('ok');
`````

## Output

`````js filename=intro
[...'xyz'];
$('ok');
`````

## Result

Should call `$` with:
 - 0: "ok"
 - 1: undefined

Normalized calls: Same

Final output calls: Same
